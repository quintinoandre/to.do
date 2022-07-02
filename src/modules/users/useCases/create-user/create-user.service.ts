import { hash } from 'bcrypt';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ICreateUserDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UserMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class CreateUserService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(data: ICreateUserDTO): Promise<UserMap> {
		const userExists = await this.usersRepository.findByEmail(data.email);

		if (userExists)
			throw new HttpException(
				{
					status: 'error',
					message: 'User already exists',
				},
				HttpStatus.BAD_REQUEST
			);

		const SALT_OR_ROUNDS = 10;

		const passwordHash = await hash(data.password, SALT_OR_ROUNDS);

		const user = await this.usersRepository.create({
			...data,
			password: passwordHash,
		});

		return UserMap.toDTO(user);
	}
}

export { CreateUserService };
