import { STATUS_CODES } from 'http';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { UpdateUserRolesDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UserAdminMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class UpdateUserRolesService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(id: string, roles: UpdateUserRolesDTO): Promise<UserMapDTO> {
		const userExists = await this.usersRepository.findById(id);

		if (!userExists) {
			throw new HttpException(
				{
					statusCode: HttpStatus.NOT_FOUND,
					message: `User doesn't exist`,
					error: STATUS_CODES[HttpStatus.NOT_FOUND],
				},
				HttpStatus.NOT_FOUND
			);
		}

		const user = await this.usersRepository.updateUserRoles(id, roles);

		return UserAdminMap.toDTO(user);
	}
}

export { UpdateUserRolesService };
