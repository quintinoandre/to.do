import { PrismaService } from 'src/shared/infra/prisma';

import { Module } from '@nestjs/common';

import { UsersRepository } from './infra/prisma/repositories';
import {
	CreateUserController,
	CreateUserService,
} from './useCases/create-user';
import {
	DeleteUserController,
	DeleteUserService,
} from './useCases/delete-user';
import { FindUserController, FindUserService } from './useCases/find-user';
import { FindUsersController, FindUsersService } from './useCases/find-users';

@Module({
	controllers: [
		CreateUserController,
		FindUserController,
		FindUsersController,
		DeleteUserController,
	],
	providers: [
		PrismaService,
		UsersRepository,
		CreateUserService,
		FindUserService,
		FindUsersService,
		DeleteUserService,
	],
	exports: [UsersRepository],
})
export class UsersModule {}
