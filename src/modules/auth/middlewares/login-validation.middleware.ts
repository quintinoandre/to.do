import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import {
	BadRequestException,
	Injectable,
	NestMiddleware,
} from '@nestjs/common';

import { LoginRequestBody } from '../dtos';

@Injectable()
class LoginValidationMiddleware implements NestMiddleware {
	async use(request: Request, response: Response, next: NextFunction) {
		const {
			body: { email, password },
		} = request;

		const loginRequestBody = new LoginRequestBody();

		loginRequestBody.email = email;

		loginRequestBody.password = password;

		const validations = await validate(loginRequestBody);

		if (validations.length) {
			throw new BadRequestException(
				validations.reduce(
					(acc, curr) => [...acc, ...Object.values(curr.constraints)],
					[]
				)
			);
		}

		next();
	}
}

export { LoginValidationMiddleware };
