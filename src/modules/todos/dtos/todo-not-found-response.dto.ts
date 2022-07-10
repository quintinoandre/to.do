import { ApiProperty } from '@nestjs/swagger';

class TodoNotFoundResponse {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: `Todo doesn't exist` })
	message: string;

	@ApiProperty({ example: `Not Found` })
	error: string;
}

export { TodoNotFoundResponse };
