import * as request from 'supertest';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../../shared/infra/prisma';
import { UsersModule } from '../../../users';
import { CreateUserDTO, UserMapDTO } from '../../../users/dtos';
import { AuthModule } from '../../auth.module';

describe('Login User (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;
	let user: CreateUserDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule, AuthModule],
			providers: [
				{
					provide: APP_PIPE,
					useClass: ValidationPipe,
				},
			],
		}).compile();

		app = moduleFixture.createNestApplication();

		await app.init();

		user = {
			name: 'Seth Lyons',
			email: 'sicgibu@fiwale.jo',
			password: 'L2XcBw0Xidx7hwf5',
		};

		const response = await request(app.getHttpServer())
			.post('/users')
			.send(user);

		createdUser = response.body;
	});

	afterEach(async () => {
		await prisma.users.delete({ where: { id: createdUser.id } });
	});

	it('/login (POST) - should be able to login a user', async () => {
		const response = await request(app.getHttpServer()).post('/login').send({
			email: user.email,
			password: user.password,
		});

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body).toMatchObject({
			access_token: expect.any(String),
		});
	});

	it('/login (POST) - should not be able to login a user with an wrong password', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				email: user.email,
				password: '1',
			})
			.expect(HttpStatus.UNAUTHORIZED);
	});

	it('/login (POST) - should not be able to login a user without password', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				email: user.email,
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/login (POST) - should not be able to login a user with an empty password', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				email: user.email,
				password: '',
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/login (POST) - should not be able to login a user with an wrong type of password', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				email: user.email,
				password: 1,
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/login (POST) - should not be able to login a user with an wrong email', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				email: 'bu@sevlizel.ai',
				password: user.password,
			})
			.expect(HttpStatus.UNAUTHORIZED);
	});

	it('/login (POST) - should not be able to login a user without email', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				password: user.password,
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/login (POST) - should not be able to login a user with an empty email', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				email: '',
				password: user.password,
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/login (POST) - should not be able to login a user with an wrong type of email', () => {
		return request(app.getHttpServer())
			.post('/login')
			.send({
				email: 1,
				password: user.password,
			})
			.expect(HttpStatus.BAD_REQUEST);
	});
});
