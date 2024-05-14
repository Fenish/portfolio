import { IsBoolean, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDTO {
	@ApiProperty()
	@IsNotEmpty({ message: 'TODO-TITLE_REQUIRED' })
	title: string;
}

export class UpdateTodoDTO {
	@ApiProperty()
	@IsNotEmpty({ message: 'TODO-TITLE_REQUIRED' })
	title: string;

	@ApiProperty()
	@IsNotEmpty({ message: 'TODO-STATUS_REQUIRED' })
	@IsBoolean({ message: 'TODO-STATUS_INVALID' })
	status: boolean;
}
