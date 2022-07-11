import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../../users/entities';
import { ILoginRequestDTO } from '../dtos';

const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): UserEntity => {
		const request = context.switchToHttp().getRequest<ILoginRequestDTO>();

		return request.user;
	}
);

export { CurrentUser };
