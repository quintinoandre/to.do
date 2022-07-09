import { IsUUID } from 'class-validator';

class FindTodoDTO {
	@IsUUID()
	id: string;
}

export { FindTodoDTO };
