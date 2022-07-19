import { hash } from 'bcrypt';
import * as request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../../shared/infra/prisma';
import { AuthModule } from '../../../auth';
import { UserTokenDTO } from '../../../auth/dtos';
import { RolesGuard } from '../../../auth/guards';
import { JwtAuthGuard } from '../../../auth/guards';
import { CreateUserDTO, UserMapDTO } from '../../dtos';
import { UserEntity } from '../../entities';
import { UsersModule } from '../../users.module';

describe('Update User Roles (e2e test)', () => {
	const prisma = new PrismaService();
	let app: INestApplication;
	let userAdmin: UserEntity;
	let user: CreateUserDTO;
	let adminAccessToken: UserTokenDTO;
	let userAccessToken: UserTokenDTO;
	let createdAdminUser: UserMapDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [UsersModule, AuthModule],
			providers: [
				{
					provide: APP_PIPE,
					useClass: ValidationPipe,
				},
				{ provide: APP_GUARD, useClass: JwtAuthGuard },
				{ provide: APP_GUARD, useClass: RolesGuard },
			],
		}).compile();

		app = moduleFixture.createNestApplication();

		await app.init();

		userAdmin = {
			id: uuidV4(),
			name: 'Keith McKenzie',
			email: `ti@uri.et`,
			password: 'XLmlD1Bsl2w8f5H8',
			roles: ['user', 'admin'],
		};

		user = {
			name: 'Lettie Soto',
			email: `esegonmuj@pik.cu`,
			password: 's4cgJAoZD0glGjyh',
		};

		const SALT_OR_ROUNDS = 10;

		const passwordHash = await hash(userAdmin.password, SALT_OR_ROUNDS);

		createdAdminUser = await prisma.users.create({
			data: { ...userAdmin, password: passwordHash },
		});

		const createdUserResponse = await request(app.getHttpServer())
			.post('/users')
			.send(user);

		createdUser = createdUserResponse.body;

		const adminResponse = await request(app.getHttpServer())
			.post('/login')
			.send({
				email: userAdmin.email,
				password: userAdmin.password,
			});

		const userResponse = await request(app.getHttpServer())
			.post('/login')
			.send({
				email: user.email,
				password: user.password,
			});

		adminAccessToken = adminResponse.body.access_token;

		userAccessToken = userResponse.body.access_token;
	});

	afterEach(async () => {
		await prisma.users.delete({ where: { id: createdAdminUser.id } });

		await prisma.users.delete({ where: { id: createdUser.id } });
	});

	it('/users/roles/:id (PATCH) - should be able to update a user roles', async () => {
		const dataToUpdate = { roles: ['user', 'admin'] };

		const response = await request(app.getHttpServer())
			.patch(`/users/roles/${createdUser.id}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.send(dataToUpdate);

		expect(response.status).toBe(HttpStatus.OK);
		expect(response.body).toMatchObject({
			id: expect.any(String),
			name: createdUser.name,
			email: createdUser.email,
			roles: dataToUpdate.roles,
		});
	});

	it('/users/roles/:id (PATCH) - should not be able to update the roles of an non existent user', () => {
		const dataToUpdate = { roles: ['user', 'admin'] };

		return request(app.getHttpServer())
			.patch(`/users/roles/${uuidV4()}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.NOT_FOUND);
	});

	it('/users/roles/:id (PATCH) - should not be able to update a user roles with an wrong type of id', () => {
		const dataToUpdate = { roles: ['user', 'admin'] };

		return request(app.getHttpServer())
			.patch(`/users/roles/${1}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users/roles/:id (PATCH) - should not be able to update a user roles without the user id', () => {
		const dataToUpdate = { roles: ['user', 'admin'] };

		return request(app.getHttpServer())
			.patch('/users/roles')
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.NOT_FOUND);
	});

	it('/users/roles/:id (PATCH) - should not be able to update a user roles without roles', () => {
		return request(app.getHttpServer())
			.patch(`/users/roles/${createdUser.id}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users/roles/:id (PATCH) - should not be able to update a user roles with an empty roles', () => {
		const dataToUpdate = { roles: '' };

		return request(app.getHttpServer())
			.patch(`/users/roles/${createdUser.id}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users/roles/:id (PATCH) - should not be able to update a user roles with an wrong type of roles', () => {
		const dataToUpdate = { roles: 1 };

		return request(app.getHttpServer())
			.patch(`/users/roles/${createdUser.id}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users/roles/:id (PATCH) - a non admin user should not be able to update a user roles', () => {
		const dataToUpdate = { roles: ['user', 'admin'] };

		return request(app.getHttpServer())
			.patch(`/users/roles/${createdAdminUser.id}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.send(dataToUpdate)
			.expect(HttpStatus.FORBIDDEN);
	});

	it('/users/roles/:id (PATCH) - a non authenticated user should not be able to update a user roles', () => {
		const dataToUpdate = { roles: ['user', 'admin'] };

		return request(app.getHttpServer())
			.patch(`/users/roles/${createdUser.id}`)
			.send(dataToUpdate)
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
