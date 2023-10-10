import { z } from 'zod'

export const cardInfoDTO = z
	.object({
		email: z.string().min(10).max(100),
		card_number: z.string().min(13).max(16),
		cvv: z.string().min(3).max(4),
		expiration_year: z.string().length(4),
		expiration_month: z.string().min(1).max(2),
	})
	.required()

export type CardInfoDTO = z.infer<typeof cardInfoDTO>
