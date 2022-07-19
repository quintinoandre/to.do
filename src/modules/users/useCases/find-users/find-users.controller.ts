import { Controller, Get } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../../auth/decorators';
import { Role } from '../../../auth/enums';
import {
	UserForbiddenResponse,
	UserMapDTO,
	UserUnauthorizedResponse,
} from '../../dtos';
import { UserAdminMap } from '../../mappers';
import { FindUsersService } from './find-users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
class FindUsersController {
	constructor(private readonly findUsersService: FindUsersService) {}

	@Get('all')
	@Roles(Role.Admin)
	@ApiOperation({
		summary: 'Route to obtain data from all users',
		description: `
	👉 Only admin users can see all users
	`,
	})
	@ApiOkResponse({ type: UserMapDTO, isArray: true })
	@ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
	@ApiForbiddenResponse({ type: UserForbiddenResponse })
	async handle(): Promise<UserAdminMap> {
		return await this.findUsersService.execute();
	}
}

export { FindUsersController };
