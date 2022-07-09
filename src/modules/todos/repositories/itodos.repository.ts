import { CreateTodoDTO, UpdateTodoDTO } from '../dtos';
import { ITodoEntity } from '../entities';

interface ITodosRepository {
	create(userId: string, data: CreateTodoDTO): Promise<ITodoEntity>;
	findById(userId: string, id: string): Promise<ITodoEntity>;
	findAll(userId: string): Promise<ITodoEntity[]>;
	findByTitle(userId: string, title: string): Promise<ITodoEntity[]>;
	delete(id: string): Promise<void>;
	update(userId: string, id: string, data: UpdateTodoDTO): Promise<ITodoEntity>;
}

export { ITodosRepository };
