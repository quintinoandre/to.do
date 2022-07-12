import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersModule } from '../../../users';
import { CreateUserDTO, UserMapDTO } from '../../../users/dtos';
import { UsersRepository } from '../../../users/infra/prisma/repositories';
import { UsersInMemoryRepository } from '../../../users/repositories/in-memory';
import { CreateUserService } from '../../../users/useCases/create-user';
import { JwtStrategy, LocalStrategy } from '../../strategies';
import { LoginService } from './login.service';

const {
	env: { JWT_SECRET: secret, JWT_EXPIRES_IN: expiresIn },
} = process;

describe('Login User', () => {
	let createUserService: CreateUserService;
	let loginService: LoginService;
	let user: CreateUserDTO;
	let createdUser: UserMapDTO;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				UsersModule,
				PassportModule,
				JwtModule.register({ secret, signOptions: { expiresIn } }),
			],
			providers: [
				CreateUserService,
				UsersRepository,
				LoginService,
				LocalStrategy,
				JwtStrategy,
			],
		})
			.overrideProvider(UsersRepository)
			.useClass(UsersInMemoryRepository)
			.compile();

		createUserService = module.get<CreateUserService>(CreateUserService);
		loginService = module.get<LoginService>(LoginService);

		user = {
			name: 'Lester Leonard',
			email: `fol@kehjulsec.ag`,
			password: 'MMv7Sy70JusXvYRX',
		};

		createdUser = await createUserService.execute(user);
	});

	it('should be able to login a user', () => {
		expect(
			loginService.execute({
				...createdUser,
				password: user.password,
				roles: ['user'],
				todos: [],
			})
		).toMatchObject({
			access_token: expect.any(String),
		});
	});
});
