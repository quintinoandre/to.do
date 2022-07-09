import { IsBoolean, IsOptional, IsString } from 'class-validator';

class UpdateTodoDTO {
	@IsString()
	@IsOptional()
	title?: string;

	@IsBoolean()
	@IsOptional()
	done?: boolean;

	@IsString()
	@IsOptional()
	deadline?: Date;
}

export { UpdateTodoDTO };
