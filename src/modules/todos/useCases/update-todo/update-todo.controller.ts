import { Body, Controller, Param, Patch } from '@nestjs/common';
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
	TodoNotFoundResponse,
	TodoUnauthorizedResponse,
	UpdateTodoDTO,
	UpdateTodoIdDTO,
	UpdateTodoOkResponseDTO,
} from '../../dtos';
import { TodoEntity } from '../../entities';
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
		@CurrentUser() { id: userId }: UserEntity,
		@Param() { id }: UpdateTodoIdDTO,
		@Body() data: UpdateTodoDTO
	): Promise<TodoEntity> {
		return await this.updateTodoService.execute(userId, id, data);
	}
}

export { UpdateTodoController };
