import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

import { UsersRepository } from './infra/prisma/repositories';
import {
	CreateUserController,
	CreateUserService,
} from './useCases/create-user';

@Module({
	controllers: [CreateUserController],
	providers: [PrismaService, UsersRepository, CreateUserService],
})
export class UsersModule {}
