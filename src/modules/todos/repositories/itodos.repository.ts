import { CreateTodoDTO, UpdateTodoDTO } from '../dtos';
import { TodoEntity } from '../entities';

interface ITodosRepository {
	create(userId: string, data: CreateTodoDTO): Promise<TodoEntity>;
	findById(userId: string, id: string): Promise<TodoEntity>;
	findAll(userId: string): Promise<TodoEntity[]>;
	findByTitle(userId: string, title: string): Promise<TodoEntity[]>;
	delete(id: string): Promise<void>;
	update(userId: string, id: string, data: UpdateTodoDTO): Promise<TodoEntity>;
}

export { ITodosRepository };
