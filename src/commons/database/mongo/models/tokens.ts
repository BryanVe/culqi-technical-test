import { Schema, model, ObjectId, Types } from 'mongoose'

export interface IToken {
	token: string
	email: string
	card_number: string
	cvv: string
	expiration_year: string
	expiration_month: string
}

const tokenSchema = new Schema<IToken>(
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
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.cvv
			},
		},
	}
)

export const Token = model<IToken>('token', tokenSchema)
