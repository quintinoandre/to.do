import { Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
	UpdateUserRolesDTO,
	UpdateUserRolesIdDTO,
	UpdateUserRolesOkResponse,
	UserNotFoundResponse,
	UserUnauthorizedResponse,
} from '../../dtos';
import { UserAdminMap } from '../../mappers';
import { UpdateUserRolesService } from './update-user-roles.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
class UpdateUserRolesController {
	constructor(
		private readonly updateUserRolesService: UpdateUserRolesService
	) {}

	@Patch('roles/:id')
	@Roles(Role.Admin)
	@ApiOperation({
		summary: 'Route to update users roles',
		description: `
	👉 Only admin users can update the roles of users
	`,
	})
	@ApiOkResponse({ type: UpdateUserRolesOkResponse })
	@ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
	@ApiNotFoundResponse({ type: UserNotFoundResponse })
	async handle(
		@Param() { id }: UpdateUserRolesIdDTO,
		@Body() roles: UpdateUserRolesDTO
	): Promise<UserAdminMap> {
		return await this.updateUserRolesService.execute(id, roles);
	}
}

export { UpdateUserRolesController };
