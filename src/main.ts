import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const {
	env: { PORT },
} = process;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(PORT);
}
bootstrap();
