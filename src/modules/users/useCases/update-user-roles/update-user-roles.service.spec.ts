import { v4 as uuidV4 } from 'uuid';

import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UsersInMemoryRepository } from '../../repositories/in-memory';
import { CreateUserService } from '../create-user';
import { UpdateUserRolesService } from './update-user-roles.service';

describe('Update User Roles', () => {
	let createUserService: CreateUserService;
	let updateUserRolesService: UpdateUserRolesService;
	let user: CreateUserDTO;
	let createdUser: UserMapDTO;
	let updatedUser: UserMapDTO;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersRepository, CreateUserService, UpdateUserRolesService],
		})
			.overrideProvider(UsersRepository)
			.useClass(UsersInMemoryRepository)
			.compile();

		createUserService = module.get<CreateUserService>(CreateUserService);
		updateUserRolesService = module.get<UpdateUserRolesService>(
			UpdateUserRolesService
		);

		user = {
			name: 'Lester Leonard',
			email: 'fol@kehjulsec.ag',
			password: 'MMv7Sy70JusXvYRX',
		};

		createdUser = await createUserService.execute(user);
	});

	it('should be able to update the roles of a user', async () => {
		const dataToUpdate = { roles: ['user', 'admin'] };

		updatedUser = await updateUserRolesService.execute(
			createdUser.id,
			dataToUpdate
		);

		expect(updatedUser).toMatchObject({
			...createdUser,
			roles: dataToUpdate.roles,
		});
	});

	it('should not be able to update the roles of a non existent user', () => {
		expect(async () => {
			const dataToUpdate = { roles: ['user', 'admin'] };

			await updateUserRolesService.execute(uuidV4(), dataToUpdate);
		}).rejects.toBeInstanceOf(HttpException);
	});
});
