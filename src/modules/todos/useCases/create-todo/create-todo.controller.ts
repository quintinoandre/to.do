import { Body, Controller, Post } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser, Roles } from '../../../auth/decorators';
import { Role } from '../../../auth/enums';
import { UserEntity } from '../../../users/entities';
import {
	CreateTodoDTO,
	CreateTodoOkResponseDTO,
	TodoUnauthorizedResponse,
} from '../../dtos';
import { TodoEntity } from '../../entities';
import { CreateTodoService } from './create-todo.service';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
class CreateTodoController {
	constructor(private readonly createTodoService: CreateTodoService) {}

	@Post()
	@ApiOperation({ summary: 'Route to create a todo' })
	@ApiCreatedResponse({ type: CreateTodoOkResponseDTO })
	@ApiUnauthorizedResponse({ type: TodoUnauthorizedResponse })
	@Roles(Role.User)
	async handle(
		@CurrentUser() { id: userId }: UserEntity,
		@Body() data: CreateTodoDTO
	): Promise<TodoEntity> {
		return await this.createTodoService.execute(userId, data);
	}
}

export { CreateTodoController };
