import { ApiProperty } from '@nestjs/swagger';

class UserUnauthorizedResponse {
	@ApiProperty({ example: 401 })
	statusCode: number;

	@ApiProperty({ example: 'Unauthorized' })
	message: string;
}

export { UserUnauthorizedResponse };
