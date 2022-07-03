import { Controller, Get } from '@nestjs/common';

import { UserMap } from '../../mappers';
import { FindUsersService } from './find-users.service';

@Controller('users')
class FindUsersController {
	constructor(private readonly findUsersService: FindUsersService) {}

	@Get('all')
	async handle(): Promise<UserMap> {
		return await this.findUsersService.execute();
	}
}

export { FindUsersController };
