import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Controller, Get, Param } from '@nestjs/common';

import { FindTodoDTO } from '../../dtos';
import { ITodoEntity } from '../../entities';
import { FindTodoService } from './find-todo.service';

@Controller('todos')
class FindTodoController {
	constructor(private readonly findTodoService: FindTodoService) {}

	@Get(':id')
	@Roles(Role.User)
	async handle(
		@CurrentUser() { id: userId }: IUserEntity,
		@Param() { id }: FindTodoDTO
	): Promise<ITodoEntity> {
		return await this.findTodoService.execute(userId, id);
	}
}

export { FindTodoController };
