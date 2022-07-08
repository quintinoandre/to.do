import { CreateTodoDTO } from '../dtos';
import { ITodoEntity } from '../entities';

interface ITodosRepository {
	create(id: string, data: CreateTodoDTO): Promise<ITodoEntity>;
	findAll(userId: string): Promise<ITodoEntity[]>;
}

export { ITodosRepository };
