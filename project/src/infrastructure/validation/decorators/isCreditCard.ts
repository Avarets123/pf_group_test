import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

/**
  https://www.freeformatter.com/credit-card-number-generator-validator.html
  How to validate a Credit Card Number?
  Most credit card number can be validated using the Luhn algorithm, which is more or a less a glorified Modulo 10 formula!

  The Luhn Formula:
  Drop the last digit from the number. The last digit is what we want to check against
  Reverse the numbers
  Multiply the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to all any result higher than 9
  Add all the numbers together
  The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)
 */
function isValidCardNumber(cardNumber: string): boolean {
  const lastDigit = parseInt(cardNumber[cardNumber.length - 1], 10)

  const reversedDigits = cardNumber.slice(0, -1).split('').reverse().map(Number)

  const total = reversedDigits.reduce((sum, digit, index) => {
    if (index % 2 === 0) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    return sum + digit
  }, 0)

  const checkDigitNeeded = (10 - (total % 10)) % 10

  return checkDigitNeeded === lastDigit
}

@ValidatorConstraint({ async: false })
export class CreditCardValidator implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return isValidCardNumber(value.replaceAll(' ', ''))
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid card number'
  }
}

export function IsCreditCard(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CreditCardValidator,
    })
  }
}
