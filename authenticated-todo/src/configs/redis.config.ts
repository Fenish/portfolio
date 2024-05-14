import { redisStore } from 'cache-manager-redis-store';

import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisOptions: CacheModuleAsyncOptions = {
	isGlobal: true,
	imports: [ConfigModule],
	useFactory: async (configService: ConfigService) => {
		const store = await redisStore({
			socket: {
				host: configService.get<string>('REDIS_HOST'),
				port: parseInt(configService.get<string>('REDIS_PORT')!),
			},
			password: configService.get<string>('REDIS_PASSWORD'),
			ttl: 1000 * 60 * 30,
		});
		return {
			store: () => store,
		};
	},
	inject: [ConfigService],
};
