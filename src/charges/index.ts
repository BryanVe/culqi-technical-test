import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context,
} from 'aws-lambda'
import { validateToken } from './utils'
import { ResponseError, buildResponse, validateBusiness } from 'commons/utils'
import { getCardInfo } from './domain'
import 'commons/database'

export const handler = async (
	event: APIGatewayProxyEvent,
	context: Context,
	callback: APIGatewayProxyCallback
) => {
	try {
		context.callbackWaitsForEmptyEventLoop = false

		const { body: data, headers } = event
		validateBusiness(headers['authorization'])
		const token = validateToken(data)
		const cardInfo = await getCardInfo(token)
		const response = buildResponse(200, cardInfo)

		callback(null, response)
	} catch (error: unknown) {
		if (error instanceof ResponseError) {
			const { statusCode, message } = error
			const response = buildResponse(statusCode, { error: message })

			callback(null, response)
		}
	}
}
