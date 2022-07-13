import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../../auth/decorators';
import { Role } from '../../../auth/enums';
import { UserEntity } from '../../../users/entities';
import {
	FindTodoDTO,
	FindTodoOkResponseDTO,
	TodoNotFoundResponse,
	TodoUnauthorizedResponse,
} from '../../dtos';
import { TodoEntity } from '../../entities';
import { FindTodoService } from './find-todo.service';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
class FindTodoController {
	constructor(private readonly findTodoService: FindTodoService) {}

	@Get(':id')
	@Roles(Role.User)
	@ApiOperation({
		summary: 'Route to obtain data from one todo of the user that is logged in',
	})
	@ApiOkResponse({ type: FindTodoOkResponseDTO })
	@ApiUnauthorizedResponse({ type: TodoUnauthorizedResponse })
	@ApiNotFoundResponse({ type: TodoNotFoundResponse })
	async handle(
		@CurrentUser() { id: userId }: UserEntity,
		@Param() { id }: FindTodoDTO
	): Promise<TodoEntity> {
		return await this.findTodoService.execute(userId, id);
	}
}

export { FindTodoController };
