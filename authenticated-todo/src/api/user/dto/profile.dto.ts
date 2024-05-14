import { ApiProperty } from '@nestjs/swagger';

export class ProfileDTO {
	@ApiProperty()
	name: string;

	@ApiProperty()
	last_name: string;

	@ApiProperty()
	email: string;

	static fromEntity(entity: any) {
		const dto = new ProfileDTO();
		dto.name = entity.name;
		dto.last_name = entity.last_name;
		dto.email = entity.email;
		return dto;
	}
}
