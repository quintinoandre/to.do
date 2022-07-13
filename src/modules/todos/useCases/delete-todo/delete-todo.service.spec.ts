import { v4 as uuidV4 } from 'uuid';

import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { TodosInMemoryRepository } from '../../repositories/in-memory';
import { CreateTodoService } from '../create-todo';
import { DeleteTodoService } from './delete-todo.service';

describe('Delete Todo', () => {
	let createTodoService: CreateTodoService;
	let deleteTodoService: DeleteTodoService;
	let todo: CreateTodoDTO;
	let userId: string;
	let createdTodo: TodoEntity;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodosRepository, CreateTodoService, DeleteTodoService],
		})
			.overrideProvider(TodosRepository)
			.useClass(TodosInMemoryRepository)
			.compile();

		createTodoService = module.get<CreateTodoService>(CreateTodoService);
		deleteTodoService = module.get<DeleteTodoService>(DeleteTodoService);

		todo = {
			title: 'Go to the bank',
			deadline: new Date(),
		};

		userId = uuidV4();

		createdTodo = await createTodoService.execute(userId, todo);
	});

	it('should be able to delete a todo', async () => {
		await deleteTodoService.execute(userId, createdTodo.id);

		expect(async () => {
			await deleteTodoService.execute(userId, createdTodo.id);
		}).rejects.toBeInstanceOf(HttpException);
	});

	it('should not be able to delete a non existent todo', () => {
		expect(async () => {
			await deleteTodoService.execute(userId, uuidV4());
		}).rejects.toBeInstanceOf(HttpException);
	});
});
