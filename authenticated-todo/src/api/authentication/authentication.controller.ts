import { ProtectedRoute } from 'src/decorators/auth/auth.decorator';

import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Session,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from './authentication.service';
import { AuthLoginDTO, AuthLoginResponseDTO } from './dto/login.dto';
import { AuthRegisterDTO, AuthRegisterResponseDTO } from './dto/register.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
	constructor(
		@Inject(AuthenticationService)
		private readonly service: AuthenticationService,

		@Inject(CACHE_MANAGER)
		private readonly cacheManager: Cache,
	) {}

	@Post('login')
	@ApiResponse({
		status: 200,
		description: 'Login response',
		type: AuthLoginResponseDTO,
	})
	async login(
		@Session() session: Record<string, any>,
		@Body() body: AuthLoginDTO,
	) {
		const { id, ...profile } = await this.service.login(body);
		session.uid = id;
		session.user = profile;

		const sessionKey = `uid:${session.uid}`;
		const sessionID = await this.cacheManager.get(sessionKey);

		if (session.id !== sessionID) {
			await this.cacheManager.del(`auth:${sessionID}`);
			await this.cacheManager.del(sessionKey);
		}

		this.cacheManager.set(`uid:${id}`, session.id);

		return profile;
	}
	@Post('register')
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Register response',
		type: AuthRegisterResponseDTO,
	})
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() body: AuthRegisterDTO) {
		const profile = await this.service.register(body);
		return profile;
	}

	@Get('session')
	@ProtectedRoute()
	async session(@Session() session: Record<string, any>) {
		return session.user;
	}
}
