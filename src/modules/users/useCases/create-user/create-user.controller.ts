import { Controller, Post, Body } from '@nestjs/common';

import { ICreateUserDTO } from '../../dtos';
import { UserMap } from '../../mappers';
import { CreateUserService } from './create-user.service';

@Controller('users')
class CreateUserController {
	constructor(private readonly usersService: CreateUserService) {}

	@Post()
	async handle(@Body() data: ICreateUserDTO): Promise<UserMap> {
		return await this.usersService.execute(data);
	}
}

export { CreateUserController };
