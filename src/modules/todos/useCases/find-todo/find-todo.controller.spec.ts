import * as request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

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

describe('Find Todo (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;
	let user: CreateUserDTO;
	let userAccessToken: UserTokenDTO;
	let createdUser: UserMapDTO;
	let todo;
	let createdTodo: TodoEntity;

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
			name: 'Susan Klein',
			email: `vut@saenout.ae`,
			password: 'CEEDE3GwqdILDTnt',
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

		todo = {
			title: 'Todo test',
			deadline: '2022-07-15T14:42:08.554Z',
		};

		const createdTodoResponse = await request(app.getHttpServer())
			.post('/todos')
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(todo);

		createdTodo = createdTodoResponse.body;
	});

	afterEach(async () => {
		await prisma.todos.delete({ where: { id: createdTodo.id } });

		await prisma.users.delete({ where: { id: createdUser.id } });
	});

	it('/todos/:id (GET) - should be able to find a todo', async () => {
		const response = await request(app.getHttpServer())
			.get(`/todos/${createdTodo.id}`)
			.set({ Authorization: `Bearer ${userAccessToken}` });

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body).toMatchObject({ ...createdTodo });
	});

	it('/todos/:id (GET) - should not be able to find a non existent todo', () => {
		return request(app.getHttpServer())
			.get(`/todos/${uuidV4()}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.expect(HttpStatus.NOT_FOUND);
	});

	it('/todos/:id (GET) - should not be able to find a todo with an wrong type of id', () => {
		return request(app.getHttpServer())
			.get(`/todos/${1}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos/:id (GET) - a non authenticated user should not be able to find a todo', () => {
		return request(app.getHttpServer())
			.get(`/todos/${createdTodo.id}`)
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
