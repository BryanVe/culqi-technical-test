import { CardInfoDTO } from '../schemas'
import { User } from 'commons/database'

export const generateToken = async (cardInfo: CardInfoDTO) => {
	const test = new User({
		...cardInfo,
		token: '12345',
	})

	await test.save()

	return cardInfo
}
