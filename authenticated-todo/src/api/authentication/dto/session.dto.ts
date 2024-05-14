import { ProfileDTO } from 'src/api/user/dto/profile.dto';

import { ApiProperty } from '@nestjs/swagger';

export class AuthSessionDTO {
	@ApiProperty()
	uid: string;

	@ApiProperty()
	profile: ProfileDTO;
}
