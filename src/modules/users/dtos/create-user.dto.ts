import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateUserDTO {
	@IsString()
	@IsOptional()
	name?: string;

	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export { CreateUserDTO };
