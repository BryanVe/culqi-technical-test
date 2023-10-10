import { connect, Mongoose, disconnect } from 'mongoose'

let mongoose: Mongoose

const dbConnection = (): {
	connect: () => Promise<Mongoose>
	disconnect: () => Promise<void>
} => {
	return {
		connect: async () => {
			console.log(process.env.MONGODB_URI as string)
			if (!mongoose) mongoose = await connect(process.env.MONGODB_URI as string)

			return mongoose
		},
		disconnect: async () => {
			await disconnect()
		},
	}
}

export { mongoose, dbConnection }
