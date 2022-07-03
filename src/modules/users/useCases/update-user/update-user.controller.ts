import { CurrentUser } from 'src/modules/auth/decorators';

import { Body, Controller, Patch } from '@nestjs/common';

import { UpdateUserDTO } from '../../dtos';
import { IUserEntity } from '../../entities';
import { UserMap } from '../../mappers';
import { UpdateUserService } from './update-user.service';

@Controller('users')
class UpdateUserController {
	constructor(private readonly updateUserService: UpdateUserService) {}

	@Patch()
	async handle(
		@CurrentUser() { id }: IUserEntity,
		@Body() data: UpdateUserDTO
	): Promise<UserMap> {
		return await this.updateUserService.execute(id, data);
	}
}

export { UpdateUserController };
