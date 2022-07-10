import { IsArray, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

class UpdateUserRolesDTO {
	@ApiProperty({ example: ['user', 'admin'] })
	@IsArray()
	@IsNotEmpty()
	roles: Array<string>;
}

export { UpdateUserRolesDTO };
