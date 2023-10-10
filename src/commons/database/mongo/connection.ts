import { connect, disconnect } from 'mongoose'

const dbConnection = (): {
	connect: () => Promise<void>
	disconnect: () => Promise<void>
} => {
	return {
		connect: async () => {
			try {
				await connect(process.env.MONGODB_URI as string)
				console.log('Successfully connected to MongoDB')
			} catch (error) {
				console.error('MongoDB connection error:', error)
			}
		},
		disconnect: async () => {
			await disconnect()
		},
	}
}

const db = dbConnection()

db.connect()
