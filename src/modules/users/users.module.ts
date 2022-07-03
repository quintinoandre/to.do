import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

import { UsersRepository } from './infra/prisma/repositories';
import {
	CreateUserController,
	CreateUserService,
} from './useCases/create-user';
import { FindUserController, FindUserService } from './useCases/find-user';
import { FindUsersController, FindUsersService } from './useCases/find-users';

@Module({
	controllers: [CreateUserController, FindUserController, FindUsersController],
	providers: [
		PrismaService,
		UsersRepository,
		CreateUserService,
		FindUserService,
		FindUsersService,
	],
	exports: [UsersRepository],
})
export class UsersModule {}
