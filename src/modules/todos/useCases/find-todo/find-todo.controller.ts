import { Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Controller, Get, Param } from '@nestjs/common';

import { FindTodoDTO } from '../../dtos';
import { ITodoEntity } from '../../entities';
import { FindTodoService } from './find-todo.service';

@Controller('todos')
class FindTodoController {
	constructor(private readonly findTodoService: FindTodoService) {}

	@Get('one/:id')
	@Roles(Role.User)
	async handle(@Param() { id }: FindTodoDTO): Promise<ITodoEntity> {
		return await this.findTodoService.execute(id);
	}
}

export { FindTodoController };
