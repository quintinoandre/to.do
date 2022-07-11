import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../../../users/entities';
import { IUserTokenPayloadDTO, UserTokenDTO } from '../../dtos';

@Injectable()
class LoginService {
	constructor(private readonly jwtService: JwtService) {}

	execute(user: UserEntity): UserTokenDTO {
		const payload: IUserTokenPayloadDTO = {
			sub: user.id,
			email: user.email,
			name: user.name,
			roles: user.roles,
		};

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}

export { LoginService };
