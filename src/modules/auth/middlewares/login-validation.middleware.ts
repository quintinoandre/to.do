import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import {
	BadRequestException,
	Injectable,
	NestMiddleware,
} from '@nestjs/common';

import { LoginDTO } from '../dtos';

@Injectable()
class LoginValidationMiddleware implements NestMiddleware {
	async use(request: Request, response: Response, next: NextFunction) {
		const {
			body: { email, password },
		} = request;

		const loginBody = new LoginDTO();

		loginBody.email = email;

		loginBody.password = password;

		const validations = await validate(loginBody);

		if (validations.length) {
			throw new BadRequestException(
				validations.reduce(
					(accumulator, currentValue) => [
						...accumulator,
						...Object.values(currentValue.constraints),
					],
					[]
				)
			);
		}

		next();
	}
}

export { LoginValidationMiddleware };
