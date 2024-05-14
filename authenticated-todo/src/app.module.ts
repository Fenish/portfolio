import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationModule } from './api/authentication/authentication.module';
import { RedisOptions } from './configs/redis.config';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		AuthenticationModule,
		DatabaseModule,
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync(RedisOptions),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
