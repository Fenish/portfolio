import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ProtectedRouteGuard implements CanActivate {
	constructor() {}

	AUTH_REQUIRED = 'AUTH-AUTHENTICATION_REQUIRED';

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const session = request.session;

		if (!session.user) {
			throw new UnauthorizedException({
				code: HttpStatus.UNAUTHORIZED,
				message: this.AUTH_REQUIRED,
			});
		}

		return true;
	}
}
