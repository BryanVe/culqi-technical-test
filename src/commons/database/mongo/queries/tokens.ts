import { IToken, Token } from '../models'

export const checkTokenExistence = async (token: string) => {
	const foundToken = await Token.exists({
		token,
	})

	return Boolean(foundToken)
}

export const saveToken = async (data: IToken) => {
	const token = new Token(data)
	const createdToken = await token.save()

	return createdToken.toJSON()
}

export const getCardInfoFromToken = async (token: string) => {
	const cardInfo = await Token.findOne({
		token,
	})

	return cardInfo?.toJSON()
}
