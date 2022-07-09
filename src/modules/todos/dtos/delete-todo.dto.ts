import { IsUUID } from 'class-validator';

class DeleteTodoDTO {
	@IsUUID()
	id: string;
}

export { DeleteTodoDTO };
