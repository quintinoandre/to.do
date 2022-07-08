import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

import { TodosRepository } from './infra/prisma/repositories';
import {
	CreateTodoController,
	CreateTodoService,
} from './useCases/create-todo';

@Module({
	controllers: [CreateTodoController],
	providers: [PrismaService, TodosRepository, CreateTodoService],
})
export class TodosModule {}
