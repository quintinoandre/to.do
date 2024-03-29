import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class CreateUserDTO {
	@ApiProperty({ example: 'Elmer Jordan' })
	@IsString()
	@IsOptional()
	name?: string;

	@ApiProperty({ example: 'abor@pajwegta.eg' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'gmEDSDBejEP7a5nT' })
	@IsString()
	@IsNotEmpty()
	password: string;
}

export { CreateUserDTO };
