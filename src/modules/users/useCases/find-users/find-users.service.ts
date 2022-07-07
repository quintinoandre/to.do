import { Inject, Injectable } from '@nestjs/common';

import { UsersRepository } from '../../infra/prisma/repositories';
import { UserAdminMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class FindUsersService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(): Promise<UserAdminMap[]> {
		const users = await this.usersRepository.findAll();

		return users.map((user) => UserAdminMap.toDTO(user));
	}
}

export { FindUsersService };
