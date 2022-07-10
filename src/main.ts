import 'dotenv/config';
import helmet from 'helmet';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

	const config = new DocumentBuilder()
		.setTitle('to.do Documentation')
		.setVersion('1.0.0')
		.addTag('login')
		.addTag('users')
		.addTag('todos')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			defaultModelsExpandDepth: -1,
			apisSorter: 'alpha',
			operationsSorter: 'method',
		},
	});

	await app.listen(PORT);
}

bootstrap();
