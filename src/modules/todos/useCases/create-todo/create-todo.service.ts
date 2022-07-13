import { Inject, Injectable } from '@nestjs/common';

import { CreateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { ITodosRepository } from '../../repositories';

@Injectable()
class CreateTodoService {
	constructor(
		@Inject(TodosRepository)
		private readonly todosRepository: ITodosRepository
	) {}

	async execute(userId: string, data: CreateTodoDTO): Promise<TodoEntity> {
		return await this.todosRepository.create(
			userId,
			data.deadline ? { ...data, deadline: new Date(data.deadline) } : data
		);
	}
}

export { CreateTodoService };
