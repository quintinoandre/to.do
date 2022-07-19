import * as request from 'supertest';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../../shared/infra/prisma';
import { UsersModule } from '../../users.module';

describe('Create User (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
			providers: [
				{
					provide: APP_PIPE,
					useClass: ValidationPipe,
				},
			],
		}).compile();

		app = moduleFixture.createNestApplication();

		await app.init();
	});

	it('/users (POST) - should be able to create a new user', async () => {
		const user = {
			name: 'Milton Conner',
			email: 'mounu3@rahlan.et',
			password: 'fb91BrEq3vQCOHe4',
		};

		const response = await request(app.getHttpServer())
			.post('/users')
			.send(user);

		await prisma.users.delete({ where: { id: response.body.id } });

		expect(response.status).toBe(HttpStatus.CREATED);
		expect(response.body).toMatchObject({
			id: expect.any(String),
			name: user.name,
			email: user.email,
		});
	});

	it('/users (POST) - should not be able to create a new user with an existent email', async () => {
		const user = {
			name: 'Milton Conner',
			email: 'mounu3@rahlan.et',
			password: 'fb91BrEq3vQCOHe4',
		};

		const createdUser = await request(app.getHttpServer())
			.post('/users')
			.send(user);

		const response = await request(app.getHttpServer())
			.post('/users')
			.send(user);

		await prisma.users.delete({ where: { id: createdUser.body.id } });

		expect(response.status).toBe(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user without password', () => {
		const user = {
			name: 'Katie Hoffman',
			email: 'logekge@anbutu.uk',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an empty password', () => {
		const user = {
			name: 'Jay Byrd',
			email: 'ro@let.pt',
			password: '',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an wrong type of password', () => {
		const user = {
			name: 'Elnora Howell',
			email: 'imefu@vuzvednu.om',
			password: 1,
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user without email', () => {
		const user = {
			name: 'Sally Gordon',
			password: 'MsAjatfgEqMetE0T',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an empty email', () => {
		const user = {
			name: 'Cordelia Brock',
			email: '',
			password: 'iYSPkDNN27s9NBT8',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an wrong type of email', () => {
		const user = {
			name: 'Nicholas Gross',
			email: 1,
			password: 'iAVWKjxZo3NhcPiJ',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});
});
