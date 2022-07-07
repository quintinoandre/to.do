import { Inject, Injectable } from '@nestjs/common';

import { UpdateUserRolesDTO, UpdateUserRolesIdDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UserAdminMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class UpdateUserRolesService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(
		id: UpdateUserRolesIdDTO,
		roles: UpdateUserRolesDTO
	): Promise<UserAdminMap> {
		const user = await this.usersRepository.updateUserRoles(id, roles);

		return UserAdminMap.toDTO(user);
	}
}

export { UpdateUserRolesService };
