import { Controller, Get } from '@nestjs/common';
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
	FindUserOkResponseDTO,
	UserMapDTO,
	UserUnauthorizedResponse,
} from '../../dtos';
import { UserEntity } from '../../entities';
import { FindUserService } from './find-user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
class FindUserController {
	constructor(private readonly findUserService: FindUserService) {}

	@Get()
	@Roles(Role.User)
	@ApiOperation({
		summary: 'Route to obtain the profile of the user that is logged in',
	})
	@ApiOkResponse({ type: FindUserOkResponseDTO })
	@ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
	async handle(@CurrentUser() { id }: UserEntity): Promise<UserMapDTO> {
		return await this.findUserService.execute(id);
	}
}

export { FindUserController };
