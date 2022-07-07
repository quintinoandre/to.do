import { IsArray, IsNotEmpty } from 'class-validator';

class UpdateUserRolesDTO {
	@IsArray()
	@IsNotEmpty()
	roles: Array<string>;
}

export { UpdateUserRolesDTO };
