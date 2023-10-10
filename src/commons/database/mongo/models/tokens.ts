import { Schema, model, ObjectId, Types } from 'mongoose'

interface IUser {
	token: string
	email: string
	card_number: string
	cvv: string
	expiration_year: string
	expiration_month: string
}

const userSchema = new Schema<IUser>(
	{
		token: { type: String, required: true },
		email: { type: String, required: true },
		card_number: { type: String, required: true },
		cvv: { type: String, required: true },
		expiration_year: { type: String, required: true },
		expiration_month: { type: String, required: true },
	},
	{
		versionKey: false,
	}
)

export const User = model<IUser>('User', userSchema)
