import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Body, Controller, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
	UpdateUserDTO,
	UpdateUserOkResponseDTO,
	UserUnauthorizedResponse,
} from '../../dtos';
import { IUserEntity } from '../../entities';
import { UserMap } from '../../mappers';
import { UpdateUserService } from './update-user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
class UpdateUserController {
	constructor(private readonly updateUserService: UpdateUserService) {}

	@Patch()
	@Roles(Role.User)
	@ApiOperation({ summary: 'Route to update user data' })
	@ApiOkResponse({ type: UpdateUserOkResponseDTO })
	@ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
	async handle(
		@CurrentUser() { id }: IUserEntity,
		@Body() data: UpdateUserDTO
	): Promise<UserMap> {
		return await this.updateUserService.execute(id, data);
	}
}

export { UpdateUserController };
