import { ApiProperty } from '@nestjs/swagger';

class UserBadRequestResponse {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: 'User already exists' })
	message: string;

	@ApiProperty({ example: 'Bad Request' })
	error: string;
}

export { UserBadRequestResponse };
