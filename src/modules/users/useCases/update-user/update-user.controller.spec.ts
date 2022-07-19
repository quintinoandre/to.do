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

describe('Update User (e2e test)', () => {
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
			name: 'Alberta Bass',
			email: `za@ehelaw.bt`,
			password: 'v5QROzHUncR8ISVt',
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

	it('/users (PATCH) - should be able to update a user', async () => {
		const dataToUpdate = {
			name: 'Henry Stewart',
			email: `tulhipuju@ga.ao`,
			password: 'vmxX88mdiVrwMd5C',
		};

		const response = await request(app.getHttpServer())
			.patch('/users')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(dataToUpdate);

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body).toMatchObject({
			id: expect.any(String),
			name: dataToUpdate.name,
			email: dataToUpdate.email,
		});
	});

	it('/users (PATCH) - should not be able to update a user with an wrong type of name', () => {
		return request(app.getHttpServer())
			.patch('/users')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send({ name: 1 })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (PATCH) - should not be able to update a user with an wrong type of email', () => {
		return request(app.getHttpServer())
			.patch('/users')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send({ email: 1 })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (PATCH) - should not be able to update a user with an empty email', () => {
		return request(app.getHttpServer())
			.patch('/users')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send({ email: '' })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (PATCH) - should not be able to update a user with an wrong type of password', () => {
		return request(app.getHttpServer())
			.patch('/users')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send({ password: 1 })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (PATCH) - a non authenticated user should not be able to update a user', () => {
		return request(app.getHttpServer())
			.patch('/users')
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
