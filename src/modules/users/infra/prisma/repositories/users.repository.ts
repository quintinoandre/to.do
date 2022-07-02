import { ICreateUserDTO } from 'src/modules/users/dtos';
import { IUserEntity } from 'src/modules/users/entities';
import { IUsersRepository } from 'src/modules/users/repositories';
import { PrismaService } from 'src/shared/infra/prisma';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class UsersRepository implements IUsersRepository {
	constructor(
		@Inject(PrismaService)
		private prisma: PrismaService
	) {}

	async create(data: ICreateUserDTO): Promise<IUserEntity> {
		return await this.prisma.users.create({ data });
	}

	async findByEmail(email: string): Promise<IUserEntity> {
		return await this.prisma.users.findUnique({ where: { email } });
	}
}

export { UsersRepository };
