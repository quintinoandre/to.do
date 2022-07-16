import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UsersInMemoryRepository } from '../../repositories/in-memory';
import { CreateUserService } from './create-user.service';

describe('Create User (unit test)', () => {
	let createUserService: CreateUserService;
	let user: CreateUserDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersRepository, CreateUserService],
		})
			.overrideProvider(UsersRepository)
			.useClass(UsersInMemoryRepository)
			.compile();

		createUserService = module.get<CreateUserService>(CreateUserService);

		user = {
			name: 'Lester Leonard',
			email: `fol${Math.random().toFixed(2)}@kehjulsec.ag`,
			password: 'MMv7Sy70JusXvYRX',
		};

		createdUser = await createUserService.execute(user);
	});

	it('should be able to create a new user', () => {
		expect(createdUser).toMatchObject({
			id: expect.any(String),
			name: user.name,
			email: user.email,
		});
	});

	it('should not be able to create a new user with an existent email', () => {
		expect(async () => {
			await createUserService.execute(user);
		}).rejects.toBeInstanceOf(HttpException);
	});
});
