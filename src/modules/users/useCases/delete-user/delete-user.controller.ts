import {
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../../auth/decorators';
import { Role } from '../../../auth/enums';
import {
	DeleteUserDTO,
	UserNotFoundResponse,
	UserUnauthorizedResponse,
} from '../../dtos';
import { DeleteUserService } from './delete-user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
class DeleteUserController {
	constructor(private readonly deleteUserService: DeleteUserService) {}

	@Delete(':id')
	@Roles(Role.Admin)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: 'Route to delete a user',
		description: `
	👉 Only admin users can delete users
	`,
	})
	@ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
	@ApiNotFoundResponse({ type: UserNotFoundResponse })
	async handle(@Param() id: DeleteUserDTO): Promise<void> {
		return await this.deleteUserService.execute(id);
	}
}

export { DeleteUserController };
