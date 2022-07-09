import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Body, Controller, Param, Patch } from '@nestjs/common';

import { UpdateTodoDTO, UpdateTodoIdDTO } from '../../dtos';
import { ITodoEntity } from '../../entities';
import { UpdateTodoService } from './update-todo.service';

@Controller('todos')
class UpdateTodoController {
	constructor(private readonly updateTodoService: UpdateTodoService) {}

	@Patch(':id')
	@Roles(Role.User)
	async handle(
		@CurrentUser() { id: userId }: IUserEntity,
		@Param() { id }: UpdateTodoIdDTO,
		@Body() data: UpdateTodoDTO
	): Promise<ITodoEntity> {
		return await this.updateTodoService.execute(userId, id, data);
	}
}

export { UpdateTodoController };
