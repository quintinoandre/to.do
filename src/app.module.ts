import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './modules/auth';
import { JwtAuthGuard } from './modules/auth/guards';
import { RolesGuard } from './modules/auth/guards';
import { TodosModule } from './modules/todos';
import { UsersModule } from './modules/users';

@Module({
	imports: [UsersModule, AuthModule, TodosModule],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RolesGuard },
	],
})
export class AppModule {}
