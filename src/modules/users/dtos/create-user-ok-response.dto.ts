import { ApiProperty } from '@nestjs/swagger';

class CreateUserOkResponseDTO {
	@ApiProperty({ example: 'f70a795c-a46b-44a3-a8fe-6ce20a75afae' })
	id: string;

	@ApiProperty({ example: 'Elmer Jordan' })
	name: string;

	@ApiProperty({ example: 'abor@pajwegta.eg' })
	email: string;
}

export { CreateUserOkResponseDTO };
