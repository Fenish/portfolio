import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object);

		if (errors.length > 0) {
			const formattedErrors = this.formatErrors(errors);
			throw new BadRequestException({
				statusCode: 400,
				error: 'Bad Request',
				message: formattedErrors,
			});
		}

		return value;
	}

	private toValidate(metatype: any): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

	private formatErrors(errors: any[]) {
		const formattedErrors: any = {};

		errors.forEach((error) => {
			Object.entries(error.constraints).forEach(() => {
				formattedErrors[error.property] = error.constraints;
			});

			if (Object.values(error.constraints).length === 1) {
				formattedErrors[error.property] = Object.values(
					error.constraints,
				)[0];
			}
		});

		return formattedErrors;
	}
}
