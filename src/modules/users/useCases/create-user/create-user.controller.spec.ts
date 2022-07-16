import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../../shared/infra/prisma';
import { UsersModule } from '../../users.module';

describe('Create User (e2e test)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule],
		}).compile();

		app = moduleFixture.createNestApplication();

		await app.init();
	});

	afterAll(async () => {
		const prisma = new PrismaService();

		await prisma.users.deleteMany();
	});

	it('/users (POST) - should be able to create a new user', () => {
		const user = {
			name: 'Milton Conner',
			email: 'mounu3@rahlan.et',
			password: 'fb91BrEq3vQCOHe4',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.CREATED);
	});

	it('/users (POST) - should not be able to create a new user with an existent email', () => {
		const user = {
			name: 'Milton Conner',
			email: 'mounu3@rahlan.et',
			password: 'fb91BrEq3vQCOHe4',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user without password', () => {
		const user = {
			name: 'Milton Conner',
			email: 'mounu3@rahlan.et',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an empty password', () => {
		const user = {
			name: 'Milton Conner',
			email: 'mounu3@rahlan.et',
			password: '',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an wrong type of password', () => {
		const user = {
			name: 'Milton Conner',
			email: 'mounu3@rahlan.et',
			password: 1,
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user without email', () => {
		const user = {
			name: 'Milton Conner',
			password: 'fb91BrEq3vQCOHe4',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an empty email', () => {
		const user = {
			name: 'Milton Conner',
			email: '',
			password: 'fb91BrEq3vQCOHe4',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users (POST) - should not be able to create a new user with an wrong type of email', () => {
		const user = {
			name: 'Milton Conner',
			email: 1,
			password: 'fb91BrEq3vQCOHe4',
		};

		return request(app.getHttpServer())
			.post('/users')
			.send(user)
			.expect(HttpStatus.BAD_REQUEST);
	});
});
