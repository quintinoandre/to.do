import { Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Body, Controller, Param, Patch } from '@nestjs/common';

import { UpdateUserRolesDTO, UpdateUserRolesIdDTO } from '../../dtos';
import { UserAdminMap } from '../../mappers';
import { UpdateUserRolesService } from './update-user-roles.service';

@Controller('users')
class UpdateUserRolesController {
	constructor(
		private readonly updateUserRolesService: UpdateUserRolesService
	) {}

	@Patch('roles/:id')
	@Roles(Role.Admin)
	async handle(
		@Param() { id }: UpdateUserRolesIdDTO,
		@Body() roles: UpdateUserRolesDTO
	): Promise<UserAdminMap> {
		return await this.updateUserRolesService.execute(id, roles);
	}
}

export { UpdateUserRolesController };
