import { ApiProperty } from '@nestjs/swagger';

class LoginUnauthorizedResponse {
	@ApiProperty({ example: 401 })
	statusCode: number;

	@ApiProperty({ example: 'Email address or password provided is incorrect' })
	message: string;

	@ApiProperty({ example: 'Unauthorized' })
	error: string;
}

export { LoginUnauthorizedResponse };
