import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UsersInMemoryRepository } from '../../repositories/in-memory';
import { CreateUserService } from '../create-user';
import { FindUserService } from './find-user.service';

describe('Find User (unit test)', () => {
	let createUserService: CreateUserService;
	let findUserService: FindUserService;
	let user: CreateUserDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersRepository, CreateUserService, FindUserService],
		})
			.overrideProvider(UsersRepository)
			.useClass(UsersInMemoryRepository)
			.compile();

		createUserService = module.get<CreateUserService>(CreateUserService);
		findUserService = module.get<FindUserService>(FindUserService);

		user = {
			name: 'Lester Leonard',
			email: 'fol@kehjulsec.ag',
			password: 'MMv7Sy70JusXvYRX',
		};

		createdUser = await createUserService.execute(user);
	});

	it('should be able to find a user', async () => {
		expect(await findUserService.execute(createdUser.id)).toMatchObject({
			...createdUser,
		});
	});
});
