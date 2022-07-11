import { v4 as uuidV4 } from 'uuid';

import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UsersInMemoryRepository } from '../../repositories/in-memory';
import { CreateUserService } from '../create-user';
import { DeleteUserService } from './delete-user.service';

describe('Delete User', () => {
	let createUserService: CreateUserService;
	let deleteUserService: DeleteUserService;
	let user: CreateUserDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersRepository, CreateUserService, DeleteUserService],
		})
			.overrideProvider(UsersRepository)
			.useClass(UsersInMemoryRepository)
			.compile();

		createUserService = module.get<CreateUserService>(CreateUserService);
		deleteUserService = module.get<DeleteUserService>(DeleteUserService);

		user = {
			name: 'Lester Leonard',
			email: `fol${Math.random().toFixed(2)}@kehjulsec.ag`,
			password: 'MMv7Sy70JusXvYRX',
		};

		createdUser = await createUserService.execute(user);
	});

	it('should be able to delete a user', async () => {
		await deleteUserService.execute({ id: createdUser.id });

		expect(async () => {
			await deleteUserService.execute({ id: createdUser.id });
		}).rejects.toBeInstanceOf(HttpException);
	});

	it('should not be able to delete a non existent user', () => {
		expect(async () => {
			await deleteUserService.execute({ id: uuidV4() });
		}).rejects.toBeInstanceOf(HttpException);
	});
});
