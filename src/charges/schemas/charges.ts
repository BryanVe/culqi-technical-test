import { z } from 'zod'

export const tokenDTO = z
	.object({
		token: z.string().length(16),
	})
	.required()

export type TokenDTO = z.infer<typeof tokenDTO>
