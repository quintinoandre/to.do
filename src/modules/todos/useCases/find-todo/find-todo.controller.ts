import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Controller, Get, Param } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
	FindTodoDTO,
	FindTodoOkResponseDTO,
	TodoNotFoundResponse,
	TodoUnauthorizedResponse,
} from '../../dtos';
import { ITodoEntity } from '../../entities';
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
		@CurrentUser() { id: userId }: IUserEntity,
		@Param() { id }: FindTodoDTO
	): Promise<ITodoEntity> {
		return await this.findTodoService.execute(userId, id);
	}
}

export { FindTodoController };
