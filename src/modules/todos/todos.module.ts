import { Module } from '@nestjs/common';

import { PrismaService } from '../../shared/infra/prisma';
import { TodosRepository } from './infra/prisma/repositories';
import {
	CreateTodoController,
	CreateTodoService,
} from './useCases/create-todo';
import {
	DeleteTodoController,
	DeleteTodoService,
} from './useCases/delete-todo';
import { FindTodoController, FindTodoService } from './useCases/find-todo';
import { FindTodosController, FindTodosService } from './useCases/find-todos';
import {
	FindTodosByTitleController,
	FindTodosByTitleService,
} from './useCases/find-todos-by-title';
import {
	UpdateTodoController,
	UpdateTodoService,
} from './useCases/update-todo';

@Module({
	controllers: [
		CreateTodoController,
		DeleteTodoController,
		FindTodosByTitleController,
		FindTodoController,
		FindTodosController,
		UpdateTodoController,
	],
	providers: [
		PrismaService,
		TodosRepository,
		CreateTodoService,
		DeleteTodoService,
		FindTodosByTitleService,
		FindTodoService,
		FindTodosService,
		UpdateTodoService,
	],
})
export class TodosModule {}
