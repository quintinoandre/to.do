import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { IUserFromTokenDTO, IUserTokenPayloadDTO } from '../dtos';

const {
	env: { JWT_SECRET: secretOrKey },
} = process;

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey,
		});
	}

	async validate(payload: IUserTokenPayloadDTO): Promise<IUserFromTokenDTO> {
		return { id: payload.sub, email: payload.email, name: payload.name };
	}
}

export { JwtStrategy };
