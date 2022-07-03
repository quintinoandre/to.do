import { Inject, Injectable } from '@nestjs/common';

import { UsersRepository } from '../../infra/prisma/repositories';
import { UserMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class FindUsersService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(): Promise<UserMap[]> {
		const users = await this.usersRepository.findAll();

		return users.map((user) => UserMap.toDTO(user));
	}
}

export { FindUsersService };
