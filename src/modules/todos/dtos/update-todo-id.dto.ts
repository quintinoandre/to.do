import { IsUUID } from 'class-validator';

class UpdateTodoIdDTO {
	@IsUUID()
	id: string;
}

export { UpdateTodoIdDTO };
