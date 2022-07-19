import * as request from 'supertest';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../../shared/infra/prisma';
import { AuthModule } from '../../../auth';
import { UserTokenDTO } from '../../../auth/dtos';
import { RolesGuard } from '../../../auth/guards';
import { JwtAuthGuard } from '../../../auth/guards';
import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersModule } from '../../users.module';

describe('Find User (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;
	let user: CreateUserDTO;
	let userAccessToken: UserTokenDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule, AuthModule],
			providers: [
				{
					provide: APP_PIPE,
					useClass: ValidationPipe,
				},
				{ provide: APP_GUARD, useClass: JwtAuthGuard },
				{ provide: APP_GUARD, useClass: RolesGuard },
			],
		}).compile();

		app = moduleFixture.createNestApplication();

		await app.init();

		user = {
			name: 'Troy Hoffman',
			email: `urpice@jinsaz.vg`,
			password: 'scUpGUY7CVFQstn6',
		};

		const createdUserResponse = await request(app.getHttpServer())
			.post('/users')
			.send(user);

		createdUser = createdUserResponse.body;

		const userResponse = await request(app.getHttpServer())
			.post('/login')
			.send({
				email: user.email,
				password: user.password,
			});

		userAccessToken = userResponse.body.access_token;
	});

	afterEach(async () => {
		await prisma.users.delete({ where: { id: createdUser.id } });
	});

	it('/users (GET) - should be able to find a user', async () => {
		const response = await request(app.getHttpServer())
			.get('/users')
			.set({ Authorization: `Bearer ${userAccessToken}` });

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body).toMatchObject({
			id: expect.any(String),
			name: createdUser.name,
			email: createdUser.email,
		});
	});

	it('/users (GET) - a non authenticated user should not be able to find a user', () => {
		return request(app.getHttpServer())
			.get('/users')
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
