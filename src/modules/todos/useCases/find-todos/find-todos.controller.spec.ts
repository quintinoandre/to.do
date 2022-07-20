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
import { TodoEntity } from '../../entities';
import { TodosModule } from '../../todos.module';

describe('Find Todos (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;
	let user: CreateUserDTO;
	let userAccessToken: UserTokenDTO;
	let createdUser: UserMapDTO;
	let todo1;
	let createdTodo1: TodoEntity;
	let todo2;
	let createdTodo2: TodoEntity;

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
			name: 'Clarence Morales',
			email: `ukove@enigobo.tc`,
			password: 'ndS38lATJtQIhRHB',
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

		todo1 = {
			title: 'Todo test 1',
			deadline: '2022-07-15T14:42:08.554Z',
		};

		todo2 = {
			title: 'Todo test 2',
			deadline: '2022-07-15T14:42:08.554Z',
		};

		const createdTodo1Response = await request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo1);

		createdTodo1 = createdTodo1Response.body;

		const createdTodo2Response = await request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo2);

		createdTodo2 = createdTodo2Response.body;
	});

	afterEach(async () => {
		await prisma.todos.delete({ where: { id: createdTodo1.id } });

		await prisma.todos.delete({ where: { id: createdTodo2.id } });

		await prisma.users.delete({ where: { id: createdUser.id } });
	});

	it('/todos (GET) - should be able to find all todos of the user that is logged in', async () => {
		const response = await request(app.getHttpServer())
			.get('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` });

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body[1]).toHaveProperty('id');
	});

	it('/todos (GET) - a non authenticated user should not be able to find all todos', () => {
		return request(app.getHttpServer())
			.get('/todos')
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
