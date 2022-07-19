import { ApiProperty } from '@nestjs/swagger';

class UserNotFoundResponse {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: `User doesn't exist` })
	message: string;

	@ApiProperty({ example: 'Not Found' })
	error: string;
}

export { UserNotFoundResponse };
