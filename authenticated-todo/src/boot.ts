import { isInstance } from 'class-validator';
import RedisStore from 'connect-redis';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import { createClient } from 'redis';
import { CustomValidationPipe } from 'src/errors/validation.error';
import { DataSource, QueryFailedError } from 'typeorm';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

export async function createDatabaseIfNotExists() {
	const connection = new DataSource({
		type: 'postgres',
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT!),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
	});

	await connection.initialize();
	try {
		await connection.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
		console.log(
			`Database '${process.env.DB_DATABASE}' created successfully`,
		);
	} catch (err: any) {
		if (isInstance(err, QueryFailedError)) {
			console.log(`Database '${process.env.DB_DATABASE}' already exists`);
		} else {
			throw err;
		}
	}
	await connection.destroy();
}

export async function boot(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('To-Do Documentation')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.useGlobalPipes(new CustomValidationPipe());

	// REDIS SESSION SETUP
	const redisClient = createClient({
		socket: {
			host: process.env.REDIS_HOST,
			port: parseInt(process.env.REDIS_PORT!),
		},
		password: process.env.REDIS_PASSWORD,
	});

	redisClient.connect();
	redisClient.on('error', (err) => console.log('Redis Client Error', err));

	const redisStore = new RedisStore({
		client: redisClient,
		prefix: 'auth:',
	});

	app.use(
		session({
			store: redisStore,
			name: 'sid',
			resave: false, // do not save session if unmodified
			saveUninitialized: false, // do not create session until something stored
			secret: process.env.SESSION_SECRET,
			rolling: true, // reset cookie age after each request
			cookie: {
				maxAge: 1000 * 60 * 30,
			},
		}),
	);
}
