import { v4 as uuidV4 } from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';

import { CreateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { TodosInMemoryRepository } from '../../repositories/in-memory';
import { CreateTodoService } from '../create-todo';
import { FindTodosByTitleService } from './find-todos-by-title.service';

describe('Find Todos By Title', () => {
	let createTodoService: CreateTodoService;
	let findTodosByTitleService: FindTodosByTitleService;
	let todo1: CreateTodoDTO;
	let todo2: CreateTodoDTO;
	let userId: string;
	let createdTodo1: TodoEntity;
	let createdTodo2: TodoEntity;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodosRepository, CreateTodoService, FindTodosByTitleService],
		})
			.overrideProvider(TodosRepository)
			.useClass(TodosInMemoryRepository)
			.compile();

		createTodoService = module.get<CreateTodoService>(CreateTodoService);
		findTodosByTitleService = module.get<FindTodosByTitleService>(
			FindTodosByTitleService
		);

		userId = uuidV4();

		todo1 = {
			title: 'Go to the pharmacy',
			deadline: new Date(),
		};

		createdTodo1 = await createTodoService.execute(userId, todo1);

		todo2 = {
			title: 'Go to the bank',
			deadline: new Date(),
		};

		createdTodo2 = await createTodoService.execute(userId, todo2);
	});

	it('should be able to find all todos by title', async () => {
		expect(await findTodosByTitleService.execute(userId, 'go')).toEqual([
			{ ...createdTodo1 },
			{ ...createdTodo2 },
		]);
	});
});
