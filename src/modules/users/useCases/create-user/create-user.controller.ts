import { IsPublic } from 'src/modules/auth/decorators';

import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDTO } from '../../dtos';
import { UserMap } from '../../mappers';
import { CreateUserService } from './create-user.service';

@Controller('users')
class CreateUserController {
	constructor(private readonly createUserService: CreateUserService) {}

	@IsPublic()
	@Post()
	async handle(@Body() data: CreateUserDTO): Promise<UserMap> {
		return await this.createUserService.execute(data);
	}
}

export { CreateUserController };
