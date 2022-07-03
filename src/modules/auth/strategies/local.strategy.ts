import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { LoginService } from '../useCases/login';

@Injectable()
class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly loginService: LoginService) {
		super({ usernameField: 'email' });
	}

	validate(email: string, password: string) {
		return this.loginService.validateUser(email, password);
	}
}

export { LocalStrategy };
