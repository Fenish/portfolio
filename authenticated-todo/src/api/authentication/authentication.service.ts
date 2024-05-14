import * as bcrypt from 'bcrypt';

import {
	BadRequestException,
	HttpStatus,
	Inject,
	Injectable,
} from '@nestjs/common';

import { ProfileDTO } from '../user/dto/profile.dto';
import { UserService } from '../user/user.service';
import { AuthLoginDTO } from './dto/login.dto';
import { AuthRegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthenticationService {
	constructor(
		@Inject(UserService)
		private readonly userService: UserService,
	) {}

	INVALID_CREDENTIALS = 'AUTH-INVALID_CREDENTIALS';

	async login(body: AuthLoginDTO) {
		const { email, password } = body;

		const user = await this.userService.findOne({
			where: {
				email,
			},
			relations: ['profile'],
		});

		const isSamePassword = await bcrypt.compare(password, user.password);
		if (!isSamePassword) {
			throw new BadRequestException({
				code: HttpStatus.BAD_REQUEST,
				message: this.INVALID_CREDENTIALS,
			});
		}

		const profile = ProfileDTO.fromEntity({
			...user.profile,
			...user,
		});

		return {
			id: user.id,
			...profile,
		};
	}

	async register(body: AuthRegisterDTO) {
		const salt = await bcrypt.genSalt();
		const password = await bcrypt.hash(body.password, salt);

		const user = await this.userService.create({
			...body,
			password: password,
		});

		return user;
	}
}
