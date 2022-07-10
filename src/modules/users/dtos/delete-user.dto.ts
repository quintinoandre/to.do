import { IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class DeleteUserDTO {
	@ApiProperty({
		example: 'f70a795c-a46b-44a3-a8fe-6ce20a75afae',
		description: `
		👉 The id must be uuid type
		`,
	})
	@IsUUID()
	id: string;
}

export { DeleteUserDTO };
