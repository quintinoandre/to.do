import { hash } from 'bcrypt';
import { isEmail } from 'class-validator';
import { STATUS_CODES } from 'http';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UsersRepository } from '../../infra/prisma/repositories';
import { UserMap } from '../../mappers';
import { IUsersRepository } from '../../repositories';

@Injectable()
class CreateUserService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {}

	async execute(data: CreateUserDTO): Promise<UserMapDTO> {
		if (!data.email || !isEmail(data.email)) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: 'email must be an email',
					error: STATUS_CODES[HttpStatus.BAD_REQUEST],
				},
				HttpStatus.BAD_REQUEST
			);
		}

		const userExists = await this.usersRepository.findByEmail(data.email);

		if (userExists) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: 'User already exists',
					error: STATUS_CODES[HttpStatus.BAD_REQUEST],
				},
				HttpStatus.BAD_REQUEST
			);
		}

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
