import { v4 as uuidV4 } from 'uuid';

import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { TodosInMemoryRepository } from '../../repositories/in-memory';
import { CreateTodoService } from '../create-todo';
import { UpdateTodoService } from './update-todo.service';

describe('Update Todo', () => {
	let createTodoService: CreateTodoService;
	let updateTodoService: UpdateTodoService;
	let todo: CreateTodoDTO;
	let userId: string;
	let createdTodo: TodoEntity;
	let updatedTodo: TodoEntity;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodosRepository, CreateTodoService, UpdateTodoService],
		})
			.overrideProvider(TodosRepository)
			.useClass(TodosInMemoryRepository)
			.compile();

		createTodoService = module.get<CreateTodoService>(CreateTodoService);
		updateTodoService = module.get<UpdateTodoService>(UpdateTodoService);

		todo = {
			title: 'Go to the bank',
			deadline: new Date(),
		};

		userId = uuidV4();

		createdTodo = await createTodoService.execute(userId, todo);
	});

	it('should be able to update a todo', async () => {
		const dataToUpdate = {
			title: 'Go to the pharmacy',
			done: true,
		};

		updatedTodo = await updateTodoService.execute(
			userId,
			createdTodo.id,
			dataToUpdate
		);

		expect(updatedTodo).toMatchObject({
			id: createdTodo.id,
			title: dataToUpdate.title,
			done: dataToUpdate.done,
			deadline: createdTodo.deadline,
			createdAt: createdTodo.createdAt,
			userId,
		});
	});

	it('should not be able to update a non existent todo', () => {
		const dataToUpdate = {
			title: 'Go to the pharmacy',
			done: true,
		};

		expect(async () => {
			await updateTodoService.execute(userId, uuidV4(), dataToUpdate);
		}).rejects.toBeInstanceOf(HttpException);
	});
});
