import { CreateUserDTO, FindUserDTO } from 'src/modules/users/dtos';
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

	async findById({ id }: FindUserDTO): Promise<IUserEntity> {
		return await this.prisma.users.findUnique({ where: { id } });
	}

	async findByEmail(email: string): Promise<IUserEntity> {
		return await this.prisma.users.findUnique({ where: { email } });
	}
}

export { UsersRepository };
