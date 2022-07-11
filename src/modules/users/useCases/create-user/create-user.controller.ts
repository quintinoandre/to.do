import { Controller, Post, Body } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { IsPublic } from '../../../auth/decorators';
import {
	CreateUserDTO,
	CreateUserOkResponseDTO,
	UserBadRequestResponse,
	UserMapDTO,
} from '../../dtos';
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
	async handle(@Body() data: CreateUserDTO): Promise<UserMapDTO> {
		return await this.createUserService.execute(data);
	}
}

export { CreateUserController };
