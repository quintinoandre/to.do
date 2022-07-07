import { compare } from 'bcrypt';
import { Strategy } from 'passport-local';
import { UsersRepository } from 'src/modules/users/infra/prisma/repositories';
import { UserAdminMap } from 'src/modules/users/mappers';
import { IUsersRepository } from 'src/modules/users/repositories';

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UnauthorizedError } from '../errors';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository
	) {
		super({ usernameField: 'email' });
	}

	async validate(
		email: string,
		password: string
	): Promise<UserAdminMap | UnauthorizedError> {
		const user = await this.usersRepository.findByEmail(email);

		if (user) {
			const isPasswordValid = await compare(password, user.password);

			if (isPasswordValid) {
				return UserAdminMap.toDTO(user);
			}
		}

		throw new UnauthorizedError(
			'Email address or password provided is incorrect'
		);
	}
}

export { LocalStrategy };
