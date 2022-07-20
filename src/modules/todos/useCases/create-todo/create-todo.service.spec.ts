import { v4 as uuidV4 } from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';

import { CreateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { TodosInMemoryRepository } from '../../repositories/in-memory';
import { CreateTodoService } from './create-todo.service';

describe('Create Todo (unit test)', () => {
	let createTodoService: CreateTodoService;
	let todo: CreateTodoDTO;
	let createdTodo: TodoEntity;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodosRepository, CreateTodoService],
		})
			.overrideProvider(TodosRepository)
			.useClass(TodosInMemoryRepository)
			.compile();

		createTodoService = module.get<CreateTodoService>(CreateTodoService);

		todo = {
			title: 'Go to the bank',
			deadline: new Date(),
		};

		createdTodo = await createTodoService.execute(uuidV4(), todo);
	});

	it('should be able to create a new todo', () => {
		expect(createdTodo).toMatchObject({
			id: expect.any(String),
			title: todo.title,
			done: false,
			deadline: todo.deadline,
			createdAt: expect.any(Date),
			userId: expect.any(String),
		});
	});
});
