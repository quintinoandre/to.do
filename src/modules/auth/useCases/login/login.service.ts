import { compare } from 'bcrypt';
import { IUserEntity } from 'src/modules/users/entities';
import { UsersRepository } from 'src/modules/users/infra/prisma/repositories';
import { UserMap } from 'src/modules/users/mappers';
import { IUsersRepository } from 'src/modules/users/repositories';

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUserJWTPayloadDTO, IUserTokenDTO } from '../../dtos';
import { UnauthorizedError } from '../../errors';

@Injectable()
class LoginService {
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: IUsersRepository,
		private readonly jwtService: JwtService
	) {}

	async validateUser(email: string, password: string): Promise<UserMap> {
		const user = await this.usersRepository.findByEmail(email);

		if (user) {
			const isPasswordValid = await compare(password, user.password);

			if (isPasswordValid) {
				return UserMap.toDTO(user);
			}
		}

		throw new UnauthorizedError(
			'Email address or password provided is incorrect'
		);
	}

	login(user: IUserEntity): IUserTokenDTO {
		const payload: IUserJWTPayloadDTO = {
			sub: user.id,
			email: user.email,
			name: user.name,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}

export { LoginService };
