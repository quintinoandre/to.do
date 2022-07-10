import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import { Body, Controller, Post } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
	CreateTodoDTO,
	CreateTodoOkResponseDTO,
	TodoUnauthorizedResponse,
} from '../../dtos';
import { ITodoEntity } from '../../entities';
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
		@CurrentUser() { id: userId }: IUserEntity,
		@Body() data: CreateTodoDTO
	): Promise<ITodoEntity> {
		return await this.createTodoService.execute(userId, data);
	}
}

export { CreateTodoController };
