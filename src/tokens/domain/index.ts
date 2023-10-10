import { generateRandomString } from 'commons/utils'
import { CardInfoDTO } from '../schemas'
import { checkTokenExistence, saveToken } from 'commons/database'

export const generateToken = async (cardInfo: CardInfoDTO) => {
	let token: string
	let isTokenInDB: boolean

	do {
		token = generateRandomString(16)
		isTokenInDB = await checkTokenExistence(token)
	} while (isTokenInDB)

	const savedToken = await saveToken({
		...cardInfo,
		token,
	})

	return savedToken
}
