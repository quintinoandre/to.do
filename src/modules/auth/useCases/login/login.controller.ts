import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';

import { IsPublic } from '../../decorators';
import { ILoginRequestDTO } from '../../dtos';
import { LocalAuthGuard } from '../../guards';
import { LoginService } from './login.service';

@Controller()
class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@IsPublic()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(HttpStatus.OK)
	login(@Request() request: ILoginRequestDTO) {
		const { user } = request;

		return this.loginService.login(user);
	}
}

export { LoginController };
