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
import {
	UpdateUserController,
	UpdateUserService,
} from './useCases/update-user';
import {
	UpdateUserRolesController,
	UpdateUserRolesService,
} from './useCases/update-user-roles';

@Module({
	controllers: [
		CreateUserController,
		DeleteUserController,
		FindUsersController,
		FindUserController,
		UpdateUserRolesController,
		UpdateUserController,
	],
	providers: [
		PrismaService,
		UsersRepository,
		CreateUserService,
		DeleteUserService,
		FindUsersService,
		FindUserService,
		UpdateUserRolesService,
		UpdateUserService,
	],
	exports: [UsersRepository],
})
export class UsersModule {}
