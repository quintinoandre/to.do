import 'dotenv/config';
import helmet from 'helmet';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const {
	env: { PORT },
} = process;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.use(helmet());

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	await app.listen(PORT);
}

bootstrap();
