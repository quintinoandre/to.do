import { ApiProperty } from '@nestjs/swagger';

class TodoUnauthorizedResponse {
	@ApiProperty({ example: 401 })
	statusCode: number;

	@ApiProperty({ example: 'Unauthorized' })
	message: string;
}

export { TodoUnauthorizedResponse };
