import { IsEmail, IsOptional, IsString } from 'class-validator';

class UpdateUserDTO {
	@IsString()
	@IsOptional()
	name?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	password?: string;
}

export { UpdateUserDTO };
