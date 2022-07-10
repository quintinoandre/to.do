import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
	TodoNotFoundResponse,
	TodoUnauthorizedResponse,
	UpdateTodoDTO,
	UpdateTodoIdDTO,
	UpdateTodoOkResponseDTO,
} from '../../dtos';
import { ITodoEntity } from '../../entities';
import { UpdateTodoService } from './update-todo.service';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
class UpdateTodoController {
	constructor(private readonly updateTodoService: UpdateTodoService) {}

	@Patch(':id')
	@Roles(Role.User)
	@ApiOperation({
		summary: 'Route to update todo data',
	})
	@ApiOkResponse({ type: UpdateTodoOkResponseDTO })
	@ApiUnauthorizedResponse({ type: TodoUnauthorizedResponse })
	@ApiNotFoundResponse({ type: TodoNotFoundResponse })
	async handle(
		@CurrentUser() { id: userId }: IUserEntity,
		@Param() { id }: UpdateTodoIdDTO,
		@Body() data: UpdateTodoDTO
	): Promise<ITodoEntity> {
		return await this.updateTodoService.execute(userId, id, data);
	}
}

export { UpdateTodoController };
