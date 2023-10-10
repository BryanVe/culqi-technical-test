import { TokenDTO, tokenDTO } from '../schemas'
import { ResponseError, validateExistence } from 'commons/utils'

export const validateTokenSchema = (data: string) => {
	const parsedData = JSON.parse(data)
	const validation = tokenDTO.safeParse(parsedData)

	if (!validation.success) {
		const errors = validation.error.errors.map(e => `${e.path} (${e.message})`)

		throw new ResponseError(400, errors.join(', '))
	}

	return validation.data
}

export const validateToken = (data: string | null): TokenDTO => {
	data = validateExistence(
		data,
		new ResponseError(400, 'Body was not provided')
	)

	const token = validateTokenSchema(data)

	return token
}
