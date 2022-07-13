import { v4 as uuidV4 } from 'uuid';

import { CreateTodoDTO, UpdateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { ITodosRepository } from '../itodos.repository';

class TodosInMemoryRepository implements ITodosRepository {
	private todos: Array<TodoEntity> = [];

	async create(userId: string, data: CreateTodoDTO): Promise<TodoEntity> {
		const todo = new TodoEntity();

		Object.assign(todo, {
			...data,
			id: uuidV4(),
			done: false,
			createdAt: new Date(),
			userId,
		});

		this.todos.push(todo);

		return todo;
	}

	async findById(userId: string, id: string): Promise<TodoEntity> {
		return this.todos.find((todo) => todo.id === id && userId === todo.userId);
	}

	async findAll(userId: string): Promise<TodoEntity[]> {
		return this.todos.filter((todo) => todo.userId === userId);
	}

	async findByTitle(userId: string, title: string): Promise<TodoEntity[]> {
		return this.todos.filter(
			(todo) =>
				todo.userId === userId &&
				todo.title.toLocaleLowerCase().includes(title.toLowerCase())
		);
	}

	async delete(id: string): Promise<void> {
		const todoIndex = this.todos.findIndex((todo) => todo.id === id);

		this.todos.splice(todoIndex, 1);
	}

	async update(
		userId: string,
		id: string,
		data: UpdateTodoDTO
	): Promise<TodoEntity> {
		const todoIndex = this.todos.findIndex(
			(todo) => todo.id === id && todo.userId === userId
		);

		const updatedTodo = this.todos[todoIndex];

		if (
			data.title &&
			data.title !== null &&
			data.title !== undefined &&
			data.title !== updatedTodo.title
		) {
			updatedTodo.title = data.title;
		}

		if (
			data.deadline &&
			data.deadline !== null &&
			data.deadline !== undefined &&
			new Date(data.deadline) !== updatedTodo.deadline
		) {
			updatedTodo.deadline = new Date(data.deadline);
		}

		if (
			data.done !== null &&
			data.done !== undefined &&
			data.done !== updatedTodo.done
		) {
			updatedTodo.done = data.done;
		}

		const [todo] = this.todos.splice(todoIndex, 1, { ...updatedTodo });

		return todo;
	}
}

export { TodosInMemoryRepository };
