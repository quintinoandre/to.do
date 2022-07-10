import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IsPublic } from '../../decorators';
import {
	ILoginRequestDTO,
	LoginDTO,
	LoginUnauthorizedResponse,
	UserTokenDTO,
} from '../../dtos';
import { LocalAuthGuard } from '../../guards';
import { LoginService } from './login.service';

@ApiTags('login')
@Controller()
class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@IsPublic()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiBody({ type: LoginDTO })
	@ApiOkResponse({ type: UserTokenDTO })
	@ApiUnauthorizedResponse({ type: LoginUnauthorizedResponse })
	handle(@Request() request: ILoginRequestDTO) {
		const { user } = request;

		return this.loginService.execute(user);
	}
}

export { LoginController };
