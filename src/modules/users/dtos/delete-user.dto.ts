import { IsUUID } from 'class-validator';

class DeleteUserDTO {
	@IsUUID()
	id: string;
}

export { DeleteUserDTO };
