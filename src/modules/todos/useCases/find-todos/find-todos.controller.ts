import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

import { Controller, Get } from '@nestjs/common';

import { ITodoEntity } from '../../entities';
import { FindTodosService } from './find-todos.service';

@Controller('todos')
class FindTodosController {
	constructor(private readonly findTodosService: FindTodosService) {}

	@Get()
	@Roles(Role.User)
	async handle(
		@CurrentUser() { id: userId }: ITodoEntity
	): Promise<ITodoEntity[]> {
		return await this.findTodosService.execute(userId);
	}
}

export { FindTodosController };
