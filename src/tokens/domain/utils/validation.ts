import { cardInfoDTO, CardInfoDTO } from '../../schemas'
import { ResponseError } from '../../../commons/domain/utils'

const validateExistence = (data: string | null) => {
	if (!data) throw new ResponseError(400, 'Body was not provided')

	return data
}

const validateCardInfoSchema = (data: string) => {
	const parsedData = JSON.parse(data)
	const validation = cardInfoDTO.safeParse(parsedData)

	if (!validation.success) {
		const errors = validation.error.errors.map(e => `${e.path} (${e.message})`)

		throw new ResponseError(400, errors.join(', '))
	}

	return validation.data
}

const validateExpirationMonth = (month: string) => {
	const monthAsNumber = parseInt(month)

	if (monthAsNumber < 1 || monthAsNumber > 12)
		throw new ResponseError(
			400,
			'Invalid expiration month, it must be between 1 and 12'
		)
}

const validateExpirationYear = (year: string) => {
	const yearAsNumber = parseInt(year)
	const now = new Date()
	const currentYear = now.getUTCFullYear()
	const lastYear = currentYear + 5

	if (yearAsNumber < currentYear || yearAsNumber > lastYear)
		throw new ResponseError(
			400,
			`Invalid expiration year, it must be between ${currentYear} and ${lastYear}`
		)
}

const validateEmail = (email: string) => {
	const regexValidator = /^[\w-\.]+@(gmail.com|hotmail.com|yahoo.es)$/

	if (!regexValidator.test(email))
		throw new ResponseError(
			400,
			'Invalid email, it must end in gmail.com, hotmail.com or yahoo.es'
		)
}

const generateNumberPattern = (size: number) => {
	const numberPattern: number[] = new Array(size)
		.fill(2)
		.map((n, index) => (index % 2 !== 0 ? 1 : n))

	return numberPattern
}

const validateCardNumber = (cardNumber: string) => {
	// * Implement Luhn algorithm
	const numberPattern = generateNumberPattern(cardNumber.length)
	const multiplyVectors = numberPattern.map((number, index) => {
		const cNumber = parseInt(cardNumber[index])
		const rNumber = number * cNumber

		if (rNumber >= 0 && rNumber <= 9) return rNumber

		const [r1, r2] = rNumber
			.toString()
			.split('')
			.map(r => parseInt(r))
		return r1 + r2
	})

	const sum = multiplyVectors.reduce(
		(result, currentNumber) => result + currentNumber,
		0
	)

	if (sum % 10 !== 0) throw new ResponseError(400, 'Invalid card number')
}

export const validateCardInfo = (data: string | null): CardInfoDTO => {
	data = validateExistence(data)

	const cardInfo = validateCardInfoSchema(data)
	const { card_number, email, expiration_year, expiration_month } = cardInfo

	validateCardNumber(card_number)
	validateExpirationMonth(expiration_month)
	validateExpirationYear(expiration_year)
	validateEmail(email)

	return cardInfo
}
