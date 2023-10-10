import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context,
} from 'aws-lambda'

export class Tokenizer {
	generateToken() {
		return {
			token: '1234',
		}
	}
}

export const handler = async (
	event: APIGatewayProxyEvent,
	context: Context,
	callback: APIGatewayProxyCallback
) => {
	const tokenizer = new Tokenizer()
	const token = tokenizer.generateToken()
	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(token),
	}

	callback(null, response)
}
