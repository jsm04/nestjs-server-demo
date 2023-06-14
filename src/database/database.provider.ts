import * as mongoose from 'mongoose'
import { PROVIDER_TOKENS } from '../lib/global-constants'

export const databaseProviders = [
	{
		provide: PROVIDER_TOKENS.DATABASE_CONNECTION,
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/dev`),
	},
]
