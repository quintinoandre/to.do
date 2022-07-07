import { Inject, Injectable } from '@nestjs/common';

import { UsersRepository } from '../../infra/prisma/repositories';
import { UserMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class FindUserService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(id: string): Promise<UserMap> {
		const user = await this.usersRepository.findById(id);

		return UserMap.toDTO(user);
	}
}

export { FindUserService };
