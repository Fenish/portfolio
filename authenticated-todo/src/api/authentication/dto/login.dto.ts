import { IsEmail, IsNotEmpty } from 'class-validator';
import { ProfileDTO } from 'src/api/user/dto/profile.dto';

import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDTO {
	@ApiProperty({ default: 'admin@todoapp.com' })
	@IsNotEmpty({ message: 'AUTH-EMAIL_REQUIRED' })
	@IsEmail({}, { message: 'AUTH-EMAIL_INVALID' })
	email: string;

	@ApiProperty({ default: '1234567890Asd.' })
	@IsNotEmpty({ message: 'AUTH-PASSWORD_REQUIRED' })
	password: string;
}

export class AuthLoginResponseDTO {
	@ApiProperty()
	profile: ProfileDTO;
}
