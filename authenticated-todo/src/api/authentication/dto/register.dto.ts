import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
	ContainsLowercase,
	ContainsSpecialCharacter,
	ContainsUppercase,
} from 'src/decorators/validators/contains.validator';

import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDTO {
	@ApiProperty({ default: 'admin@todoapp.com' })
	@IsNotEmpty({ message: 'AUTH-EMAIL_REQUIRED' })
	@IsEmail({}, { message: 'AUTH-EMAIL_INVALID' })
	email: string;

	@ApiProperty({ default: '1234567890Asd.' })
	@IsNotEmpty({ message: 'AUTH-PASSWORD_REQUIRED' })
	@MinLength(6, { message: 'AUTH-PASSWORD_MINLENGTH' })
	@ContainsUppercase({ message: 'AUTH-PASSWORD_UPPERCASE' })
	@ContainsLowercase({ message: 'AUTH-PASSWORD_LOWERCASE' })
	@ContainsSpecialCharacter({ message: 'AUTH-PASSWORD_SPECIAL' })
	password: string;

	@ApiProperty({ default: 'John' })
	@IsNotEmpty({ message: 'AUTH-NAME_REQUIRED' })
	@IsAlpha('tr-TR', { message: 'AUTH-NAME_INVALID' })
	name: string;

	@ApiProperty({ default: 'Doe' })
	@IsNotEmpty({ message: 'AUTH-LAST_NAME_REQUIRED' })
	@IsAlpha('tr-TR', { message: 'AUTH-LAST_NAME_INVALID' })
	last_name: string;
}

export class AuthRegisterResponseDTO {
	@ApiProperty()
	name: string;

	@ApiProperty()
	last_name: string;

	@ApiProperty()
	email: string;
}
