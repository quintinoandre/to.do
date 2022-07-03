import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

import { UsersRepository } from './infra/prisma/repositories';
import {
	CreateUserController,
	CreateUserService,
} from './useCases/create-user';
import { FindUserController, FindUserService } from './useCases/find-user';

@Module({
	controllers: [CreateUserController, FindUserController],
	providers: [
		PrismaService,
		UsersRepository,
		CreateUserService,
		FindUserService,
	],
	exports: [UsersRepository],
})
export class UsersModule {}
