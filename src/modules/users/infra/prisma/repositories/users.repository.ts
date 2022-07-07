import { hash } from 'bcrypt';
import {
	CreateUserDTO,
	DeleteUserDTO,
	UpdateUserRolesDTO,
	UpdateUserRolesIdDTO,
} from 'src/modules/users/dtos';
import { UpdateUserDTO } from 'src/modules/users/dtos';
import { IUserEntity } from 'src/modules/users/entities';
import { IUsersRepository } from 'src/modules/users/repositories';
import { PrismaService } from 'src/shared/infra/prisma';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class UsersRepository implements IUsersRepository {
	constructor(
		@Inject(PrismaService)
		private readonly prisma: PrismaService
	) {}

	async create(data: CreateUserDTO): Promise<IUserEntity> {
		return await this.prisma.users.create({ data });
	}

	async delete({ id }: DeleteUserDTO): Promise<void> {
		await this.prisma.users.delete({ where: { id } });

		return;
	}

	async findById(id: string): Promise<IUserEntity> {
		return await this.prisma.users.findUnique({ where: { id } });
	}

	async findByEmail(email: string): Promise<IUserEntity> {
		return await this.prisma.users.findUnique({ where: { email } });
	}

	async findAll(): Promise<IUserEntity[]> {
		return await this.prisma.users.findMany();
	}

	async updateUser(id: string, data: UpdateUserDTO): Promise<IUserEntity> {
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
		{ id }: UpdateUserRolesIdDTO,
		{ roles }: UpdateUserRolesDTO
	): Promise<IUserEntity> {
		return await this.prisma.users.update({
			where: { id },
			data: { roles },
		});
	}
}

export { UsersRepository };
