import { Inject, Injectable } from '@nestjs/common';

import { UpdateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UserMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class UpdateUserService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(id: string, data: UpdateUserDTO): Promise<UserMapDTO> {
		const user = await this.usersRepository.updateUser(id, data);

		return UserMap.toDTO(user);
	}
}

export { UpdateUserService };
