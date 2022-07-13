import { STATUS_CODES } from 'http';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { ITodosRepository } from '../../repositories';

@Injectable()
class FindTodoService {
	constructor(
		@Inject(TodosRepository)
		private readonly todosRepository: ITodosRepository
	) {}

	async execute(userId: string, id: string): Promise<TodoEntity> {
		const todo = await this.todosRepository.findById(userId, id);

		if (!todo) {
			throw new HttpException(
				{
					statusCode: HttpStatus.NOT_FOUND,
					message: `Todo doesn't exist`,
					error: STATUS_CODES[HttpStatus.NOT_FOUND],
				},
				HttpStatus.NOT_FOUND
			);
		}

		return todo;
	}
}

export { FindTodoService };
