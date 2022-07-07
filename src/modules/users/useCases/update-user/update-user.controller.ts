import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Body, Controller, Patch } from '@nestjs/common';

import { UpdateUserDTO } from '../../dtos';
import { IUserEntity } from '../../entities';
import { UserMap } from '../../mappers';
import { UpdateUserService } from './update-user.service';

@Controller('users')
class UpdateUserController {
	constructor(private readonly updateUserService: UpdateUserService) {}

	@Patch()
	@Roles(Role.User)
	async handle(
		@CurrentUser() { id }: IUserEntity,
		@Body() data: UpdateUserDTO
	): Promise<UserMap> {
		return await this.updateUserService.execute(id, data);
	}
}

export { UpdateUserController };
