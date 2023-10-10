export class ResponseError extends Error {
	statusCode: number

	constructor(statusCode: number, message: string) {
		super(message)
		this.statusCode = statusCode
	}
}

export const buildResponse = (statusCode: number, data: {}) => {
	const response = {
		statusCode,
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json',
		},
	}

	return response
}
