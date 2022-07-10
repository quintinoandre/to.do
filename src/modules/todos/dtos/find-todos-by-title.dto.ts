import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class FindTodosByTitleDTO {
	@ApiProperty({ example: 'bank' })
	@IsString()
	title: string;
}

export { FindTodosByTitleDTO };
