import { CreateTodoDTO, UpdateTodoDTO } from 'src/modules/todos/dtos';
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

	async create(userId: string, data: CreateTodoDTO): Promise<ITodoEntity> {
		return await this.prisma.todos.create({ data: { ...data, userId } });
	}

	async findById(userId: string, id: string): Promise<ITodoEntity> {
		return await this.prisma.todos.findFirst({ where: { id, userId } });
	}

	async findAll(userId: string): Promise<ITodoEntity[]> {
		return await this.prisma.$queryRaw`
		SELECT * FROM todos
    WHERE "userId" = ${userId}
		ORDER BY deadline ASC, title ASC
		`;
	}

	async findByTitle(userId: string, title: string): Promise<ITodoEntity[]> {
		return await this.prisma.$queryRaw`
		SELECT * FROM todos
		WHERE "userId" = ${userId}
		AND title LIKE ${`%${title}%`}
		ORDER BY deadline ASC, title ASC
		`;
	}

	async delete(id: string): Promise<void> {
		await this.prisma.todos.delete({ where: { id } });

		return;
	}

	async update(
		userId: string,
		id: string,
		data: UpdateTodoDTO
	): Promise<ITodoEntity> {
		const todo = await this.findById(userId, id);

		const dataToUpdate: UpdateTodoDTO = {};

		if (
			data.title &&
			data.title !== null &&
			data.title !== undefined &&
			data.title !== todo.title
		) {
			dataToUpdate.title = data.title;
		}

		if (
			data.deadline &&
			data.deadline !== null &&
			data.deadline !== undefined &&
			new Date(data.deadline) !== todo.deadline
		) {
			dataToUpdate.deadline = new Date(data.deadline);
		}

		if (
			data.done &&
			data.done !== null &&
			data.done !== undefined &&
			data.done !== todo.done
		) {
			dataToUpdate.done = data.done;
		}

		return await this.prisma.todos.update({
			where: { id },
			data: { ...dataToUpdate },
		});
	}
}

export { TodosRepository };
