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

describe('Update Todo (e2e test)', () => {
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
			name: 'Eva Soto',
			email: `amano@hifuwbez.jp`,
			password: '0iMZy1prb9avyHMS',
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

	it('/todos/:id (PATCH) - should be able to update a todo', async () => {
		const dataToUpdate = {
			title: 'Go to the pharmacy',
			done: true,
		};

		const response = await request(app.getHttpServer())
			.patch(`/todos/${createdTodo.id}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(dataToUpdate);

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body).toMatchObject({
			id: createdTodo.id,
			title: dataToUpdate.title,
			done: dataToUpdate.done,
			deadline: createdTodo.deadline,
			createdAt: createdTodo.createdAt,
			userId: createdTodo.userId,
		});
	});

	it('/todos/:id (PATCH) - should not be able to update a non existent todo', () => {
		return request(app.getHttpServer())
			.patch(`/todos/${uuidV4()}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.expect(HttpStatus.NOT_FOUND);
	});

	it('/todos/:id (PATCH) - should not be able to update a todo with an wrong type of id', () => {
		return request(app.getHttpServer())
			.patch(`/todos/${1}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos/:id (PATCH) - should not be able to update a todo with an wrong type of title', () => {
		const dataToUpdate = {
			title: 1,
			done: true,
		};

		return request(app.getHttpServer())
			.patch(`/todos/${createdTodo.id}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos/:id (PATCH) - should not be able to update a todo with an wrong type of done', () => {
		const dataToUpdate = {
			title: 'Go to the pharmacy',
			done: '1',
		};

		return request(app.getHttpServer())
			.patch(`/todos/${createdTodo.id}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos/:id (PATCH) - should not be able to update a todo with an wrong type of deadline', () => {
		const dataToUpdate = {
			title: 'Go to the pharmacy',
			done: true,
			deadline: 1,
		};

		return request(app.getHttpServer())
			.patch(`/todos/${createdTodo.id}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/todos/:id (PATCH) - a non authenticated user should not be able to update a todo', () => {
		return request(app.getHttpServer())
			.patch(`/todos/${createdTodo.id}`)
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
