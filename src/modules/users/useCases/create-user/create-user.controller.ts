import { IsPublic } from 'src/modules/auth/decorators';

import { Controller, Post, Body } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import {
	CreateUserDTO,
	CreateUserOkResponseDTO,
	UserBadRequestResponse,
} from '../../dtos';
import { UserMap } from '../../mappers';
import { CreateUserService } from './create-user.service';

@ApiTags('users')
@Controller('users')
class CreateUserController {
	constructor(private readonly createUserService: CreateUserService) {}

	@IsPublic()
	@Post()
	@ApiOperation({ summary: 'Route to create a user' })
	@ApiCreatedResponse({ type: CreateUserOkResponseDTO })
	@ApiBadRequestResponse({ type: UserBadRequestResponse })
	async handle(@Body() data: CreateUserDTO): Promise<UserMap> {
		return await this.createUserService.execute(data);
	}
}

export { CreateUserController };
