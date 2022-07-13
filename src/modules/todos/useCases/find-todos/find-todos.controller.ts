import { Controller, Get } from '@nestjs/common';
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
import { FindTodosOkResponseDTO, TodoUnauthorizedResponse } from '../../dtos';
import { TodoEntity } from '../../entities';
import { FindTodosService } from './find-todos.service';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
class FindTodosController {
	constructor(private readonly findTodosService: FindTodosService) {}

	@Get()
	@Roles(Role.User)
	@ApiOperation({
		summary:
			'Route to obtain data from all todos of the user that is logged in',
	})
	@ApiOkResponse({ type: FindTodosOkResponseDTO, isArray: true })
	@ApiUnauthorizedResponse({ type: TodoUnauthorizedResponse })
	async handle(
		@CurrentUser() { id: userId }: UserEntity
	): Promise<TodoEntity[]> {
		return await this.findTodosService.execute(userId);
	}
}

export { FindTodosController };
