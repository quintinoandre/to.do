import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth';
import { JwtAuthGuard } from './modules/auth/guards';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { UsersModule } from './modules/users';

@Module({
	imports: [UsersModule, AuthModule],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RolesGuard },
	],
})
export class AppModule {}
