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

describe('Delete User (e2e test)', () => {
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
			name: 'Lou Bass',
			email: `gektunlu@etris.tn`,
			password: 'AWuHF0Rv3513MwHy',
			roles: ['user', 'admin'],
		};

		user = {
			name: 'Francis Cook',
			email: `urkop@terwet.sr`,
			password: 'qGxVI8I18QIdfqBt',
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
		const userAdmin = await prisma.users.findUnique({
			where: { id: createdAdminUser.id },
		});

		const user = await prisma.users.findUnique({
			where: { id: createdUser.id },
		});

		if (userAdmin) {
			await prisma.users.delete({ where: { id: createdAdminUser.id } });
		}

		if (user) {
			await prisma.users.delete({ where: { id: createdUser.id } });
		}
	});

	it('/users/:id (DELETE) - should be able to delete a user', () => {
		return request(app.getHttpServer())
			.delete(`/users/${createdUser.id}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.expect(HttpStatus.NO_CONTENT);
	});

	it('/users/:id (DELETE) - should not be able to delete a non existent user', () => {
		return request(app.getHttpServer())
			.delete(`/users/${uuidV4()}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.expect(HttpStatus.NOT_FOUND);
	});

	it('/users/:id (DELETE) - should not be able to delete a user with an wrong type of id', () => {
		return request(app.getHttpServer())
			.delete(`/users/${1}`)
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/users/:id (DELETE) - should not be able to delete a user without the user id', () => {
		return request(app.getHttpServer())
			.delete('/users')
			.set({ Authorization: `Bearer ${adminAccessToken}` })
			.expect(HttpStatus.NOT_FOUND);
	});

	it('/users/:id (DELETE) - a non admin user should not be able to delete a user', () => {
		return request(app.getHttpServer())
			.delete(`/users/${createdAdminUser.id}`)
			.set({ Authorization: `Bearer ${userAccessToken}` })
			.expect(HttpStatus.FORBIDDEN);
	});

	it('/users/:id (DELETE) - a non authenticated user should not be able to delete a user', () => {
		return request(app.getHttpServer())
			.delete(`/users/${createdUser.id}`)
			.expect(HttpStatus.UNAUTHORIZED);
	});
});
