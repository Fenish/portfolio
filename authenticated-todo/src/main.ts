import * as dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { boot, createDatabaseIfNotExists } from './boot';

dotenv.config();

async function bootstrap() {
	// CREATE DATABASE IF NOT EXISTS
	await createDatabaseIfNotExists();

	const app = await NestFactory.create(AppModule);
	const port = process.env.BACKEND_PORT || 5000;

	await boot(app);

	await app.listen(port);
	console.log(`Server running on port ${port}`);
}
bootstrap();
