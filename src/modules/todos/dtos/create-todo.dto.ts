import { IsNotEmpty, IsOptional, IsString, MinDate } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class CreateTodoDTO {
	@ApiProperty({ example: 'Go to the bank' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ example: '2022-07-15T14:42:08.554Z' })
	@IsString()
	@IsOptional()
	@MinDate(new Date())
	deadline?: Date;
}

export { CreateTodoDTO };
