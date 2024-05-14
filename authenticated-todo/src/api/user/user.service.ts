import { Repository } from 'typeorm';

import {
	BadRequestException,
	ConflictException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Profile } from '../../database/entities/profile.entity';
import { User } from '../../database/entities/user.entity';
import { AuthRegisterDTO } from '../authentication/dto/register.dto';
import { ProfileDTO } from './dto/profile.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
	) {}

	INVALID_CREDENTIALS = 'AUTH-INVALID_CREDENTIALS';
	ALREADY_EXISTS = 'AUTH-USER_ALREADY_EXISTS';

	async findOne(options: {
		where: any;
		relations?: Array<any>;
	}): Promise<User> {
		const user = await this.userRepository.findOne({
			where: options.where,
			relations: options.relations,
		});

		if (!user) {
			throw new BadRequestException({
				code: HttpStatus.BAD_REQUEST,
				message: this.INVALID_CREDENTIALS,
			});
		}

		return user;
	}

	async isExists(options: { where: any }): Promise<boolean> {
		const user = await this.userRepository.findOne({
			where: options.where,
		});

		return !!user;
	}

	async create(body: AuthRegisterDTO): Promise<ProfileDTO> {
		const isExists = await this.isExists({
			where: {
				email: body.email,
			},
		});

		if (isExists) {
			throw new ConflictException({
				code: HttpStatus.CONFLICT,
				message: this.ALREADY_EXISTS,
			});
		}

		const user = this.userRepository.create({
			email: body.email,
			password: body.password,
		});

		const profile = this.profileRepository.create({
			name: body.name,
			last_name: body.last_name,
		});

		await this.profileRepository.save(profile);

		user.profile = profile;
		await this.userRepository.save(user);

		return ProfileDTO.fromEntity({
			...profile,
			email: user.email,
		});
	}
}
