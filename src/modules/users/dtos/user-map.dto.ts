import { ApiProperty } from '@nestjs/swagger';

import { ITodoEntity } from '../../todos/entities';

class UserMapDTO {
	@ApiProperty({ example: 'f70a795c-a46b-44a3-a8fe-6ce20a75afae' })
	id: string;

	@ApiProperty({ example: 'Elmer Jordan' })
	name: string;

	@ApiProperty({ example: 'abor@pajwegta.eg' })
	email: string;

	@ApiProperty({ example: ['user'] })
	roles?: Array<string>;

	todos?: Array<ITodoEntity>;
}

export { UserMapDTO };
