import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UsersInMemoryRepository } from '../../repositories/in-memory';
import { CreateUserService } from '../create-user';
import { FindUsersService } from './find-users.service';

describe('Find Users', () => {
	let createUserService: CreateUserService;
	let findUsersService: FindUsersService;
	let user1: CreateUserDTO;
	let user2: CreateUserDTO;
	let createdUser1: UserMapDTO;
	let createdUser2: UserMapDTO;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersRepository, CreateUserService, FindUsersService],
		})
			.overrideProvider(UsersRepository)
			.useClass(UsersInMemoryRepository)
			.compile();

		createUserService = module.get<CreateUserService>(CreateUserService);
		findUsersService = module.get<FindUsersService>(FindUsersService);

		user1 = {
			name: 'Lester Leonard',
			email: `fol@kehjulsec.ag`,
			password: 'MMv7Sy70JusXvYRX',
		};

		createdUser1 = await createUserService.execute(user1);

		user2 = {
			name: 'Cordelia Lambert',
			email: `pitup@ce.tg`,
			password: '0BpyYGN8TkW5GVcT',
		};

		createdUser2 = await createUserService.execute(user2);
	});

	it('should be able to find all users', async () => {
		expect(await findUsersService.execute()).toEqual([
			{ ...createdUser1, roles: ['user'], todos: [] },
			{ ...createdUser2, roles: ['user'], todos: [] },
		]);
	});
});
