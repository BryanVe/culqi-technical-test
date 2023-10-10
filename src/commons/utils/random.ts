import crypto from 'crypto'

export const generateRandomString = (size: number) => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
	const randomArray = Array.from(
		{ length: size },
		() => chars[crypto.randomInt(chars.length - 1)]
	)

	const randomString = randomArray.join('')
	return randomString
}
