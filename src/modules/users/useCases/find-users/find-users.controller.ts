import { Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Controller, Get } from '@nestjs/common';

import { UserAdminMap } from '../../mappers';
import { FindUsersService } from './find-users.service';

@Controller('users')
class FindUsersController {
	constructor(private readonly findUsersService: FindUsersService) {}

	@Get()
	@Roles(Role.Admin)
	async handle(): Promise<UserAdminMap> {
		return await this.findUsersService.execute();
	}
}

export { FindUsersController };
