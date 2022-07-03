import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { IUserFromJWTDTO, IUserJWTPayloadDTO } from '../dtos';

const {
	env: { JWT_SECRET: secretOrKey },
} = process;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey,
		});
	}

	async validate(payload: IUserJWTPayloadDTO): Promise<IUserFromJWTDTO> {
		return { id: payload.sub, email: payload.email, name: payload.name };
	}
}
