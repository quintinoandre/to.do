import { CreateTodoDTO } from 'src/modules/todos/dtos';
import { ITodoEntity } from 'src/modules/todos/entities';
import { ITodosRepository } from 'src/modules/todos/repositories';
import { PrismaService } from 'src/shared/infra/prisma';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class TodosRepository implements ITodosRepository {
	constructor(
		@Inject(PrismaService)
		private readonly prisma: PrismaService
	) {}

	async create(id: string, data: CreateTodoDTO): Promise<ITodoEntity> {
		return await this.prisma.todos.create({ data: { ...data, userId: id } });
	}
}

export { TodosRepository };
