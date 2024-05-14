import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			applicationName: process.env.APP_NAME,
			entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
			synchronize: process.env.NODE_ENV === 'development' ? true : false,
		}),
	],
	controllers: [],
	providers: [],
})
export class DatabaseModule {}
