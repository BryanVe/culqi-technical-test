import { TokenDTO } from '../schemas'
import { getCardInfoFromToken } from 'commons/database'
import { ResponseError } from 'commons/utils'

export const getCardInfo = async (token: TokenDTO) => {
	const cardInfo = await getCardInfoFromToken(token.token)

	if (!cardInfo) throw new ResponseError(404, 'Provided token was expired')

	return cardInfo
}
