import { Inject, Injectable } from '@nestjs/common';

import { FindUserDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UserMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class FindUserService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute({ id }: FindUserDTO): Promise<UserMap> {
		const user = await this.usersRepository.findById({ id });

		return UserMap.toDTO(user);
	}
}

export { FindUserService };
