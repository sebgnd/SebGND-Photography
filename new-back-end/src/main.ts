import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from '@app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('SebGND Photography API')
		.setVersion('0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		})
	);
	SwaggerModule.setup('api', app, document);

	await app.listen(8000);
}

bootstrap();
