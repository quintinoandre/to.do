import { IsUUID } from 'class-validator';

class FindUserDTO {
	@IsUUID()
	id: string;
}

export { FindUserDTO };
