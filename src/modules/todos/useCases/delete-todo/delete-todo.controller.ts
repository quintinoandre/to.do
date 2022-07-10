import { CurrentUser, Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';
import { IUserEntity } from 'src/modules/users/entities';

import {
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiNotFoundResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
	DeleteTodoDTO,
	TodoNotFoundResponse,
	TodoUnauthorizedResponse,
} from '../../dtos';
import { DeleteTodoService } from './delete-todo.service';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
class DeleteTodoController {
	constructor(private readonly deleteTodoService: DeleteTodoService) {}

	@Delete(':id')
	@Roles(Role.User)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Route to delete a todo' })
	@ApiUnauthorizedResponse({ type: TodoUnauthorizedResponse })
	@ApiNotFoundResponse({ type: TodoNotFoundResponse })
	async handle(
		@CurrentUser() { id: userId }: IUserEntity,
		@Param() { id }: DeleteTodoDTO
	): Promise<void> {
		return await this.deleteTodoService.execute(userId, id);
	}
}

export { DeleteTodoController };
