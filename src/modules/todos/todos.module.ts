import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

import { TodosRepository } from './infra/prisma/repositories';
import {
	CreateTodoController,
	CreateTodoService,
} from './useCases/create-todo';
import { FindTodoController, FindTodoService } from './useCases/find-todo';
import { FindTodosController, FindTodosService } from './useCases/find-todos';

@Module({
	controllers: [CreateTodoController, FindTodosController, FindTodoController],
	providers: [
		PrismaService,
		TodosRepository,
		CreateTodoService,
		FindTodosService,
		FindTodoService,
	],
})
export class TodosModule {}
