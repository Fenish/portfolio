import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

export function ContainsUppercase(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'containsUppercase',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (typeof value !== 'string') {
						return false;
					}
					return /[A-Z]/.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must contain at least one uppercase letter`;
				},
			},
		});
	};
}

export function ContainsLowercase(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'containsLowercase',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (typeof value !== 'string') {
						return false;
					}
					return /[a-z]/.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must contain at least one lowercase letter`;
				},
			},
		});
	};
}

export function ContainsSpecialCharacter(
	validationOptions?: ValidationOptions,
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'containsSpecialCharacter',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (typeof value !== 'string') {
						return false;
					}
					return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} must contain at least one special character`;
				},
			},
		});
	};
}
