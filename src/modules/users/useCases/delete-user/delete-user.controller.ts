import {
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
} from '@nestjs/common';

import { DeleteUserDTO } from '../../dtos';
import { DeleteUserService } from './delete-user.service';

@Controller('users')
class DeleteUserController {
	constructor(private readonly deleteUserService: DeleteUserService) {}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param() id: DeleteUserDTO): Promise<void> {
		return await this.deleteUserService.execute(id);
	}
}

export { DeleteUserController };
