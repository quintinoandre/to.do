import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateTodoDTO {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsOptional()
	deadline?: Date;
}

export { CreateTodoDTO };
