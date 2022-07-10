import { ApiProperty } from '@nestjs/swagger';

class UpdateTodoOkResponseDTO {
	@ApiProperty({ example: '2b84a3ef-fb89-4ab2-b345-e469277755ed' })
	id: string;

	@ApiProperty({ example: 'Go to the bank' })
	title: string;

	@ApiProperty({ example: true })
	done: boolean;

	@ApiProperty({ example: '2022-07-15T14:42:08.554Z' })
	deadline: Date;

	@ApiProperty({ example: '2022-07-10T14:42:08.554Z' })
	createdAt: Date;

	@ApiProperty({ example: 'f70a795c-a46b-44a3-a8fe-6ce20a75afae' })
	userId: string;
}

export { UpdateTodoOkResponseDTO };
