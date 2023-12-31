import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context,
} from 'aws-lambda'
import { validateCardInfo } from './utils'
import { ResponseError, buildResponse, validateBusiness } from 'commons/utils'
import { generateToken } from './domain'
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
		const cardInfo = validateCardInfo(data)
		const token = await generateToken(cardInfo)
		const response = buildResponse(200, token)

		callback(null, response)
	} catch (error: unknown) {
		if (error instanceof ResponseError) {
			const { statusCode, message } = error
			const response = buildResponse(statusCode, { error: message })

			callback(null, response)
		}
	}
}
