import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context,
} from 'aws-lambda'
import { validateCardInfo } from './domain/utils'
import { ResponseError, buildResponse } from '../commons/domain/utils'
import { generateToken } from './domain'

export const handler = async (
	event: APIGatewayProxyEvent,
	_context: Context,
	callback: APIGatewayProxyCallback
) => {
	try {
		const { body: data } = event
		const cardInfo = validateCardInfo(data)
		const token = generateToken(cardInfo)
		const response = buildResponse(200, token)

		callback(null, response)
	} catch (error: unknown) {
		if (error instanceof ResponseError) {
			const response = buildResponse(error.statusCode, { error: error.message })

			callback(null, response)
		}
	}
}
