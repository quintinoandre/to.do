import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

import { TodosRepository } from './infra/prisma/repositories';
import {
	CreateTodoController,
	CreateTodoService,
} from './useCases/create-todo';
import { FindTodosController, FindTodosService } from './useCases/find-todos';

@Module({
	controllers: [CreateTodoController, FindTodosController],
	providers: [
		PrismaService,
		TodosRepository,
		CreateTodoService,
		FindTodosService,
	],
})
export class TodosModule {}
