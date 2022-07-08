import { Inject, Injectable } from '@nestjs/common';

import { ITodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { ITodosRepository } from '../../repositories';

@Injectable()
class FindTodosService {
	constructor(
		@Inject(TodosRepository)
		private readonly todosRepository: ITodosRepository
	) {}

	async execute(userId: string): Promise<ITodoEntity[]> {
		return await this.todosRepository.findAll(userId);
	}
}

export { FindTodosService };
