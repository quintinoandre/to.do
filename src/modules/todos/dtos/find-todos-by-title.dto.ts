import { IsString } from 'class-validator';

class FindTodosByTitleDTO {
	@IsString()
	title: string;
}

export { FindTodosByTitleDTO };
