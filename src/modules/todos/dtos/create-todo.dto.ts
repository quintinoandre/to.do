import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class CreateTodoDTO {
	@ApiProperty({ example: 'Go to the bank' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ example: '2022-07-15T14:42:08.554Z' })
	@IsString()
	@IsOptional()
	deadline?: Date;
}

export { CreateTodoDTO };
