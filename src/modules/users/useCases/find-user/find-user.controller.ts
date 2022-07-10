import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Controller, Get } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { FindUserOkResponseDTO, UserUnauthorizedResponse } from '../../dtos';
import { IUserEntity } from '../../entities';
import { UserMap } from '../../mappers';
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
	async handle(@CurrentUser() { id }: IUserEntity): Promise<UserMap> {
		return await this.findUserService.execute(id);
	}
}

export { FindUserController };
