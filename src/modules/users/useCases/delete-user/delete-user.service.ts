import { STATUS_CODES } from 'http';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DeleteUserDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { IUsersRepository } from '../../repositories';

@Injectable()
class DeleteUserService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute({ id }: DeleteUserDTO): Promise<void> {
		const user = await this.usersRepository.findById({ id });

		if (!user) {
			throw new HttpException(
				{
					statusCode: HttpStatus.NOT_FOUND,
					message: `User doesn't exist`,
					error: STATUS_CODES[HttpStatus.NOT_FOUND],
				},
				HttpStatus.NOT_FOUND
			);
		}

		return await this.usersRepository.delete({ id });
	}
}

export { DeleteUserService };
