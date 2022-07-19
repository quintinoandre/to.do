import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UsersInMemoryRepository } from '../../repositories/in-memory';
import { CreateUserService } from '../create-user';
import { UpdateUserService } from './update-user.service';

describe('Update User (unit test)', () => {
	let createUserService: CreateUserService;
	let updateUserService: UpdateUserService;
	let user: CreateUserDTO;
	let createdUser: UserMapDTO;
	let updatedUser: UserMapDTO;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersRepository, CreateUserService, UpdateUserService],
		})
			.overrideProvider(UsersRepository)
			.useClass(UsersInMemoryRepository)
			.compile();

		createUserService = module.get<CreateUserService>(CreateUserService);
		updateUserService = module.get<UpdateUserService>(UpdateUserService);

		user = {
			name: 'Lester Leonard',
			email: 'fol@kehjulsec.ag',
			password: 'MMv7Sy70JusXvYRX',
		};

		createdUser = await createUserService.execute(user);
	});

	it('should be able to update a user', async () => {
		const dataToUpdate = {
			name: 'Julian Warner',
			email: `co@fanhedan.eg`,
			password: 'NDV3HUZxPKg7t7jT',
		};

		updatedUser = await updateUserService.execute(createdUser.id, dataToUpdate);

		expect(updatedUser).toMatchObject({
			id: createdUser.id,
			name: dataToUpdate.name,
			email: dataToUpdate.email,
		});
	});
});
