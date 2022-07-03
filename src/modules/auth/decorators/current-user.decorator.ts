import { IUserEntity } from 'src/modules/users/entities';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ILoginRequestDTO } from '../dtos';

const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): IUserEntity => {
		const request = context.switchToHttp().getRequest<ILoginRequestDTO>();

		return request.user;
	}
);

export { CurrentUser };
