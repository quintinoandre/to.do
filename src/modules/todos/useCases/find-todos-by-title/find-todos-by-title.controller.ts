import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Controller, Get, Query } from '@nestjs/common';

import { FindTodosByTitleDTO } from '../../dtos';
import { ITodoEntity } from '../../entities';
import { FindTodosByTitleService } from './find-todos-by-title.service';

@Controller('todos')
class FindTodosByTitleController {
	constructor(
		private readonly findTodosByTitleService: FindTodosByTitleService
	) {}

	@Get('bytitle')
	@Roles(Role.User)
	async handle(
		@CurrentUser() { id: userId }: IUserEntity,
		@Query() { title }: FindTodosByTitleDTO
	): Promise<ITodoEntity[]> {
		return await this.findTodosByTitleService.execute(userId, title);
	}
}

export { FindTodosByTitleController };
