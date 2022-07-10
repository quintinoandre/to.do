import { IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class UpdateUserDTO {
	@ApiProperty({ example: 'Elmer Jordan' })
	@IsString()
	@IsOptional()
	name?: string;

	@ApiProperty({ example: 'abor@pajwegta.eg' })
	@IsEmail()
	@IsOptional()
	email?: string;

	@ApiProperty({ example: 'gmEDSDBejEP7a5nT' })
	@IsString()
	@IsOptional()
	password?: string;
}

export { UpdateUserDTO };
