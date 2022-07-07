import { IsUUID } from 'class-validator';

class UpdateUserRolesIdDTO {
	@IsUUID()
	id: string;
}

export { UpdateUserRolesIdDTO };
