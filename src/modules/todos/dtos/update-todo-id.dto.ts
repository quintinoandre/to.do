import { IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class UpdateTodoIdDTO {
	@ApiProperty({
		example: '2b84a3ef-fb89-4ab2-b345-e469277755ed',
		description: `
		👉 The id must be uuid type
		`,
	})
	@IsUUID()
	id: string;
}

export { UpdateTodoIdDTO };
