import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class LoginDTO {
	@ApiProperty({ example: 'abor@pajwegta.eg' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'gmEDSDBejEP7a5nT' })
	@IsString()
	@IsNotEmpty()
	password: string;
}

export { LoginDTO };
