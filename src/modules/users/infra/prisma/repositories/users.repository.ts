import { hash } from 'bcrypt';

import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../../shared/infra/prisma';
import {
	CreateUserDTO,
	DeleteUserDTO,
	UpdateUserDTO,
	UpdateUserRolesDTO,
} from '../../../dtos';
import { UserEntity } from '../../../entities';
import { IUsersRepository } from '../../../repositories';

@Injectable()
class UsersRepository implements IUsersRepository {
	constructor(
		@Inject(PrismaService)
		private readonly prisma: PrismaService
	) {}

	async create(data: CreateUserDTO): Promise<UserEntity> {
		return await this.prisma.users.create({ data });
	}

	async delete({ id }: DeleteUserDTO): Promise<void> {
		await this.prisma.users.delete({ where: { id } });

		return;
	}

	async findById(id: string): Promise<UserEntity> {
		return await this.prisma.users.findUnique({ where: { id } });
	}

	async findByEmail(email: string): Promise<UserEntity> {
		return await this.prisma.users.findUnique({ where: { email } });
	}

	async findAll(): Promise<UserEntity[]> {
		return await this.prisma.users.findMany({
			include: { todos: true },
			orderBy: { name: 'asc' },
		});
	}

	async updateUser(id: string, data: UpdateUserDTO): Promise<UserEntity> {
		const user = await this.findById(id);

		const dataToUpdate: UpdateUserDTO = {};

		if (
			data.name &&
			data.name !== null &&
			data.name !== undefined &&
			data.name !== user.name
		) {
			dataToUpdate.name = data.name;
		}

		if (
			data.email &&
			data.email !== null &&
			data.email !== undefined &&
			data.email !== user.email
		) {
			dataToUpdate.email = data.email;
		}

		if (
			data.password &&
			data.password !== null &&
			data.password !== undefined
		) {
			const SALT_OR_ROUNDS = 10;

			const passwordHash = await hash(data.password, SALT_OR_ROUNDS);

			dataToUpdate.password = passwordHash;
		}

		return await this.prisma.users.update({
			where: { id },
			data: { ...dataToUpdate },
		});
	}

	async updateUserRoles(
		id: string,
		{ roles }: UpdateUserRolesDTO
	): Promise<UserEntity> {
		const users = await this.findAll();

		const userToUpdate = users.find((user) => user.id === id);

		if (
			roles &&
			roles !== null &&
			roles !== undefined &&
			roles.length > 0 &&
			roles !== userToUpdate.roles
		) {
			return await this.prisma.users.update({
				where: { id },
				data: { roles },
			});
		}

		delete userToUpdate.todos;

		return userToUpdate;
	}
}

export { UsersRepository };
