import { hash } from 'bcrypt';
import * as request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../../shared/infra/prisma';
import { AuthModule } from '../../../auth';
import { UserTokenDTO } from '../../../auth/dtos';
import { RolesGuard } from '../../../auth/guards';
import { JwtAuthGuard } from '../../../auth/guards';
import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UserEntity } from '../../entities';
import { UsersModule } from '../../users.module';

describe('Find Users (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;
	let userAdmin: UserEntity;
	let user: CreateUserDTO;
	let adminAccessToken: UserTokenDTO;
	let userAccessToken: UserTokenDTO;
	let createdAdminUser: UserMapDTO;
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

		userAdmin = {
			id: uuidV4(),
			name: 'Jeremy Townsend',
			email: `edzolof@itsitle.mc`,
			password: 'x2XRYQkoqyXd9rg8',
			roles: ['user', 'admin'],
		};

		user = {
			name: 'Laura Lowe',
			email: `fupito@go.ml`,
			password: 'gvEOpt2DQNOakbHt',
		};

		const SALT_OR_ROUNDS = 10;

		const passwordHash = await hash(userAdmin.password, SALT_OR_ROUNDS);

		createdAdminUser = await prisma.users.create({
			data: { ...userAdmin, password: passwordHash },
		});

		const createdUserResponse = await request(app.getHttpServer())
			.post('/users')
			.send(user);

		createdUser = createdUserResponse.body;

		const adminResponse = await request(app.getHttpServer())
			.post('/login')
			.send({
				email: userAdmin.email,
				password: userAdmin.password,
			});

		const userResponse = await request(app.getHttpServer())
			.post('/login')
			.send({
				email: user.email,
				password: user.password,
			});

		adminAccessToken = adminResponse.body.access_token;

		userAccessToken = userResponse.body.access_token;
	});

	afterEach(async () => {
		await prisma.users.delete({ where: { id: createdAdminUser.id } });

		await prisma.users.delete({ where: { id: createdUser.id } });
	});

	it('/users/all (GET) - should be able to find all users', async () => {
		const response = await request(app.getHttpServer())
			.get('/users/all')
			.set({ Authorization: `Bearer ${adminAccessToken}` });

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body[0]).toHaveProperty('id');
	});

	it('/users/all (GET) - a non admin user should not be able to find all a users', async () => {
		return request(app.getHttpServer())
			.get('/users/all')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.expect(HttpStatus.FORBIDDEN);
	});

	it('/users/all (GET) - a non authenticated user should not be able to find all users', () => {
		return request(app.getHttpServer())
			.get('/users/all')
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
