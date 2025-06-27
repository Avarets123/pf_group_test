import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsDateFormatConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
    return typeof value === 'string' && dateRegex.test(value)
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date ($value) must be in the format MM/YY'
  }
}

export function IsExpiresCard(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateFormatConstraint,
    })
  }
}
