import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginRequestBody {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export { LoginRequestBody };
