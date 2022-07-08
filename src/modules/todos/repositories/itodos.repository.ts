import { CreateTodoDTO } from '../dtos';
import { ITodoEntity } from '../entities';

interface ITodosRepository {
	create(id: string, data: CreateTodoDTO): Promise<ITodoEntity>;
}

export { ITodosRepository };
