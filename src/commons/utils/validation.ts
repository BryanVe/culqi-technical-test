import { ResponseError } from '../utils'

export const validateExistence = (
	data: string | null | undefined,
	error: ResponseError
) => {
	if (!data) throw error

	return data
}

export const validateBusiness = (bearer: string | undefined) => {
	bearer = validateExistence(
		bearer,
		new ResponseError(401, 'Business bearer token not provided')
	)

	if (!bearer.startsWith('Bearer '))
		throw new ResponseError(400, 'Invalid business bearer token')

	// * Business validation using database
}
