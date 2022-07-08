import { Inject, Injectable } from '@nestjs/common';

import { CreateTodoDTO } from '../../dtos';
import { ITodoEntity } from '../../entities';
import { TodosRepository } from '../../infra/prisma/repositories';
import { ITodosRepository } from '../../repositories';

@Injectable()
export class CreateTodoService {
	constructor(
		@Inject(TodosRepository)
		private readonly todosRepository: ITodosRepository
	) {}

	async execute(id: string, data: CreateTodoDTO): Promise<ITodoEntity> {
		return await this.todosRepository.create(
			id,
			data.deadline ? { ...data, deadline: new Date(data.deadline) } : data
		);
	}
}
