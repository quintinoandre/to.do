import { Roles } from 'src/modules/auth/decorators';
import { Role } from 'src/modules/auth/enums';

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
	@Roles(Role.Admin)
	@HttpCode(HttpStatus.NO_CONTENT)
	async handle(@Param() id: DeleteUserDTO): Promise<void> {
		return await this.deleteUserService.execute(id);
	}
}

export { DeleteUserController };
