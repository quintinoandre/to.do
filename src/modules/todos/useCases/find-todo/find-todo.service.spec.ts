import { v4 as uuidV4 } from 'uuid';

import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { TodosInMemoryRepository } from '../../repositories/in-memory';
import { CreateTodoService } from '../create-todo';
import { FindTodoService } from './find-todo.service';

describe('Find Todo (unit test)', () => {
	let createTodoService: CreateTodoService;
	let findTodoService: FindTodoService;
	let todo: CreateTodoDTO;
	let userId: string;
	let createdTodo: TodoEntity;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodosRepository, CreateTodoService, FindTodoService],
		})
			.overrideProvider(TodosRepository)
			.useClass(TodosInMemoryRepository)
			.compile();

		createTodoService = module.get<CreateTodoService>(CreateTodoService);
		findTodoService = module.get<FindTodoService>(FindTodoService);

		todo = {
			title: 'Go to the bank',
			deadline: new Date(),
		};

		userId = uuidV4();

		createdTodo = await createTodoService.execute(userId, todo);
	});

	it('should be able to find a todo', async () => {
		expect(await findTodoService.execute(userId, createdTodo.id)).toMatchObject(
			{ ...createdTodo }
		);
	});

	it('should not be able to find a non existent todo', () => {
		expect(async () => {
			await findTodoService.execute(userId, uuidV4());
		}).rejects.toBeInstanceOf(HttpException);
	});
});
