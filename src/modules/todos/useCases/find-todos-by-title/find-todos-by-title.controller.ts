import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Controller, Get, Query } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
	FindTodosByTitleDTO,
	FindTodosByTitleOkResponseDTO,
	TodoUnauthorizedResponse,
} from '../../dtos';
import { ITodoEntity } from '../../entities';
import { FindTodosByTitleService } from './find-todos-by-title.service';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
class FindTodosByTitleController {
	constructor(
		private readonly findTodosByTitleService: FindTodosByTitleService
	) {}

	@Get('bytitle')
	@Roles(Role.User)
	@ApiOperation({
		summary:
			'Route to obtain data from all todos of the user that is logged in, by title',
	})
	@ApiOkResponse({ type: FindTodosByTitleOkResponseDTO, isArray: true })
	@ApiUnauthorizedResponse({ type: TodoUnauthorizedResponse })
	async handle(
		@CurrentUser() { id: userId }: IUserEntity,
		@Query() { title }: FindTodosByTitleDTO
	): Promise<ITodoEntity[]> {
		return await this.findTodosByTitleService.execute(userId, title);
	}
}

export { FindTodosByTitleController };
