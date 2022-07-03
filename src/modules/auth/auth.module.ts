import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users';
import { LoginValidationMiddleware } from './middlewares';
import { JwtStrategy, LocalStrategy } from './strategies';
import { LoginController, LoginService } from './useCases/login';

const {
	env: { JWT_SECRET: secret, JWT_EXPIRES_IN: expiresIn },
} = process;

@Module({
	imports: [
		UsersModule,
		JwtModule.register({ secret, signOptions: { expiresIn } }),
	],
	controllers: [LoginController],
	providers: [LoginService, LocalStrategy, JwtStrategy],
})
class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoginValidationMiddleware).forRoutes('login');
	}
}

export { AuthModule };
