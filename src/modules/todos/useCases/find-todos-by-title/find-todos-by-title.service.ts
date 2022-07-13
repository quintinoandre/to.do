import { Inject, Injectable } from '@nestjs/common';

import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { ITodosRepository } from '../../repositories';

@Injectable()
class FindTodosByTitleService {
	constructor(
		@Inject(TodosRepository)
		private readonly todosRepository: ITodosRepository
	) {}

	async execute(userId: string, title: string): Promise<TodoEntity[]> {
		return await this.todosRepository.findByTitle(userId, title);
	}
}

export { FindTodosByTitleService };
