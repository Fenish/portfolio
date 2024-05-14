import {
	BadRequestException,
	HttpStatus,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class IsValidUUID implements PipeTransform {
	async transform(value: number) {
		if (typeof value !== 'number' || value <= 0) {
			if (!this.isUUID(value)) {
				throw new BadRequestException({
					code: HttpStatus.BAD_REQUEST,
					message: 'Invalid UUID',
				});
			}
		}
		return value;
	}

	private isUUID(value: any): boolean {
		const uuidRegex =
			/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
		return uuidRegex.test(value);
	}
}
