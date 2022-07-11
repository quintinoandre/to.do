import { Body, Controller, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../../auth/decorators';
import { Role } from '../../../auth/enums';
import {
	UpdateUserDTO,
	UpdateUserOkResponseDTO,
	UserMapDTO,
	UserUnauthorizedResponse,
} from '../../dtos';
import { UserEntity } from '../../entities';
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
		@CurrentUser() { id }: UserEntity,
		@Body() data: UpdateUserDTO
	): Promise<UserMapDTO> {
		return await this.updateUserService.execute(id, data);
	}
}

export { UpdateUserController };
