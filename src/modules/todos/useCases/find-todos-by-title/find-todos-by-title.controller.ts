import { Controller, Get, Query } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../../auth/decorators';
import { Role } from '../../../auth/enums';
import { UserEntity } from '../../../users/entities';
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
		@CurrentUser() { id: userId }: UserEntity,
		@Query() { title }: FindTodosByTitleDTO
	): Promise<ITodoEntity[]> {
		return await this.findTodosByTitleService.execute(userId, title);
	}
}

export { FindTodosByTitleController };
