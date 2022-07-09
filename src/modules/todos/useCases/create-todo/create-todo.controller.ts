import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Body, Controller, Post } from '@nestjs/common';

import { CreateTodoDTO } from '../../dtos';
import { ITodoEntity } from '../../entities';
import { CreateTodoService } from './create-todo.service';

@Controller('todos')
class CreateTodoController {
	constructor(private readonly createTodoService: CreateTodoService) {}

	@Post()
	@Roles(Role.User)
	async handle(
		@CurrentUser() { id: userId }: IUserEntity,
		@Body() data: CreateTodoDTO
	): Promise<ITodoEntity> {
		return await this.createTodoService.execute(userId, data);
	}
}

export { CreateTodoController };
