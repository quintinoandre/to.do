import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Controller, Get } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { FindTodosOkResponseDTO, TodoUnauthorizedResponse } from '../../dtos';
import { ITodoEntity } from '../../entities';
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
		@CurrentUser() { id: userId }: IUserEntity
	): Promise<ITodoEntity[]> {
		return await this.findTodosService.execute(userId);
	}
}

export { FindTodosController };
