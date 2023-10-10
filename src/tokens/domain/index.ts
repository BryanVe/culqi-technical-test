import { generateRandomString } from 'commons/utils'
import { CardInfoDTO } from '../schemas'
import { User } from 'commons/database'

export const generateToken = async (cardInfo: CardInfoDTO) => {
	const token = generateRandomString(16)
	const test = new User({
		...cardInfo,
		token,
	})

	await test.save()

	return cardInfo
}
