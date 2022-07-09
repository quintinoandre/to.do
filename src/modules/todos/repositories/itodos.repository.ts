import { CreateTodoDTO } from '../dtos';
import { ITodoEntity } from '../entities';

interface ITodosRepository {
	create(userId: string, data: CreateTodoDTO): Promise<ITodoEntity>;
	findById(userId: string, id: string): Promise<ITodoEntity>;
	findAll(userId: string): Promise<ITodoEntity[]>;
	findByTitle(userId: string, title: string): Promise<ITodoEntity[]>;
}

export { ITodosRepository };
