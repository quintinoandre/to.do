import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Controller, Get } from '@nestjs/common';

import { IUserEntity } from '../../entities';
import { UserMap } from '../../mappers';
import { FindUserService } from './find-user.service';

@Controller('users')
class FindUserController {
	constructor(private readonly findUserService: FindUserService) {}

	@Get('one')
	@Roles(Role.User)
	async handle(@CurrentUser() { id }: IUserEntity): Promise<UserMap> {
		return await this.findUserService.execute({ id });
	}
}

export { FindUserController };
