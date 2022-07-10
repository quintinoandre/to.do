import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class UpdateTodoDTO {
	@ApiProperty({ example: 'Go to the bank' })
	@IsString()
	@IsOptional()
	title?: string;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	done?: boolean;

	@ApiProperty({ example: '2022-07-15T14:42:08.554Z' })
	@IsString()
	@IsOptional()
	deadline?: Date;
}

export { UpdateTodoDTO };
