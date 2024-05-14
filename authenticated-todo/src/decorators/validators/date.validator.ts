import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

export function IsTurkishDateFormat(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsTurkishDateFormat',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					// Custom validation logic
					const regex = /^\d{2}\-\d{2}\-\d{4}$/;
					return typeof value === 'string' && regex.test(value);
				},

				defaultMessage(args: ValidationArguments) {
					return `Invalid date format specified. Please use "DD-MM-YYYY" format.`;
				},
			},
		});
	};
}
