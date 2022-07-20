import * as request from 'supertest';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../../shared/infra/prisma';
import { AuthModule } from '../../../auth';
import { UserTokenDTO } from '../../../auth/dtos';
import { JwtAuthGuard, RolesGuard } from '../../../auth/guards';
import { UsersModule } from '../../../users';
import { CreateUserDTO, UserMapDTO } from '../../../users/dtos';
import { TodosModule } from '../../todos.module';

describe('Create Todo (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;
	let user: CreateUserDTO;
	let userAccessToken: UserTokenDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule, TodosModule, AuthModule],
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
			name: 'Claudia Harmon',
			email: `bujliw@tumildo.ve`,
			password: 'ijQLi09eDA4viA5S',
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

	it('/todos (POST) - should be able to create a new todo', async () => {
		const todo = {
			title: 'Todo test',
			deadline: '2022-07-15T14:42:08.554Z',
		};

		const response = await request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo);

		await prisma.todos.delete({ where: { id: response.body.id } });

		expect(response.status).toBe(HttpStatus.CREATED);
		expect(response.body).toMatchObject({
			id: expect.any(String),
			title: todo.title,
			done: false,
			deadline: todo.deadline,
			createdAt: expect.any(String),
			userId: createdUser.id,
		});
	});

	it('/todos (POST) - should not be able to create a new todo without title', () => {
		const todo = {
			deadline: '2022-07-15T14:42:08.554Z',
		};

		return request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos (POST) - should not be able to create a new todo with an empty title', () => {
		const todo = {
			title: '',
			deadline: '2022-07-15T14:42:08.554Z',
		};

		return request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos (POST) - should not be able to create a new todo with an wrong type of title', () => {
		const todo = {
			title: 1,
			deadline: '2022-07-15T14:42:08.554Z',
		};

		return request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos (POST) - should not be able to create a new todo with an empty deadline', () => {
		const todo = {
			title: 'Todo test',
			deadline: '',
		};

		return request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos (POST) - should not be able to create a new todo with an wrong type of deadline', () => {
		const todo = {
			title: 'Todo test',
			deadline: 1,
		};

		return request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos (GET) - a non authenticated user should not be able to create a new todo', () => {
		const todo = {
			title: 'Todo test',
			deadline: '2022-07-15T14:42:08.554Z',
		};

		return request(app.getHttpServer())
			.post('/todos')
			.send(todo)
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
