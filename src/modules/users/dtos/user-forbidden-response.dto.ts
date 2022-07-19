import { ApiProperty } from '@nestjs/swagger';

class UserForbiddenResponse {
	@ApiProperty({ example: 403 })
	statusCode: number;

	@ApiProperty({ example: 'Forbidden resource' })
	message: string;

	@ApiProperty({ example: 'Forbidden' })
	error: string;
}

export { UserForbiddenResponse };
