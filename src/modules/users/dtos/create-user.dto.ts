import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ICreateUserDTO {
	@IsString()
	@IsOptional()
	name?: string;

	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export { ICreateUserDTO };
