import {
	CreateUserDTO,
	DeleteUserDTO,
	FindUserDTO,
} from 'src/modules/users/dtos';
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

	async findById({ id }: FindUserDTO): Promise<IUserEntity> {
		return await this.prisma.users.findUnique({ where: { id } });
	}

	async findByEmail(email: string): Promise<IUserEntity> {
		return await this.prisma.users.findUnique({ where: { email } });
	}

	async findAll(): Promise<IUserEntity[]> {
		return await this.prisma.users.findMany();
	}
}

export { UsersRepository };
