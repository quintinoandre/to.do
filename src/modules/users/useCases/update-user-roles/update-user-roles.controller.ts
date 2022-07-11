import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../../auth/decorators';
import { Role } from '../../../auth/enums';
import {
	UpdateUserRolesDTO,
	UpdateUserRolesIdDTO,
	UpdateUserRolesOkResponse,
	UserMapDTO,
	UserNotFoundResponse,
	UserUnauthorizedResponse,
} from '../../dtos';
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
	): Promise<UserMapDTO> {
		return await this.updateUserRolesService.execute(id, roles);
	}
}

export { UpdateUserRolesController };
