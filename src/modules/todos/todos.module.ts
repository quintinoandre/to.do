import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

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
		FindTodosByTitleController,
		FindTodoController,
		FindTodosController,
		DeleteTodoController,
		UpdateTodoController,
	],
	providers: [
		PrismaService,
		TodosRepository,
		CreateTodoService,
		FindTodosByTitleService,
		FindTodoService,
		FindTodosService,
		DeleteTodoService,
		UpdateTodoService,
	],
})
export class TodosModule {}
