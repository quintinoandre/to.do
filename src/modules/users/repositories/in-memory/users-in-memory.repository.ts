import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import {
	CreateUserDTO,
	DeleteUserDTO,
	UpdateUserDTO,
	UpdateUserRolesDTO,
} from '../../dtos';
import { UserEntity } from '../../entities';
import { IUsersRepository } from '../iusers.repository';

class UsersInMemoryRepository implements IUsersRepository {
	private users: Array<UserEntity> = [];

	async create(data: CreateUserDTO): Promise<UserEntity> {
		const user = new UserEntity();

		Object.assign(user, { ...data, id: uuidV4(), roles: ['user'], todos: [] });

		this.users.push(user);

		return user;
	}

	async delete(data: DeleteUserDTO): Promise<void> {
		const userIndex = this.users.findIndex(({ id }) => id === data.id);

		this.users.splice(userIndex, 1);
	}

	async findByEmail(email: string): Promise<UserEntity> {
		return this.users.find((user) => user.email === email);
	}

	async findById(id: string): Promise<UserEntity> {
		return this.users.find((user) => user.id === id);
	}

	async findAll(): Promise<UserEntity[]> {
		return this.users;
	}

	async updateUser(id: string, data: UpdateUserDTO): Promise<UserEntity> {
		const userIndex = this.users.findIndex((user) => user.id === id);

		const updatedUser = this.users[userIndex];

		if (
			data.name &&
			data.name !== null &&
			data.name !== undefined &&
			data.name !== updatedUser.name
		) {
			updatedUser.name = data.name;
		}

		if (
			data.email &&
			data.email !== null &&
			data.email !== undefined &&
			data.email !== updatedUser.email
		) {
			updatedUser.email = data.email;
		}

		if (
			data.password &&
			data.password !== null &&
			data.password !== undefined
		) {
			const SALT_OR_ROUNDS = 10;

			const passwordHash = await hash(data.password, SALT_OR_ROUNDS);

			updatedUser.password = passwordHash;
		}

		const [user] = this.users.splice(userIndex, 1, { ...updatedUser });

		return user;
	}

	async updateUserRoles(
		id: string,
		{ roles }: UpdateUserRolesDTO
	): Promise<UserEntity> {
		const userIndex = this.users.findIndex((user) => user.id === id);

		const updatedUser = this.users[userIndex];

		if (
			roles &&
			roles !== null &&
			roles !== undefined &&
			roles.length > 0 &&
			roles !== updatedUser.roles
		) {
			updatedUser.roles = roles;
		}

		const [user] = this.users.splice(userIndex, 1, { ...updatedUser });

		delete user.todos;

		return user;
	}
}

export { UsersInMemoryRepository };
