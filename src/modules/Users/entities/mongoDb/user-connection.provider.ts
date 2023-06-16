import { Connection } from 'mongoose'
import { PROVIDER_TOKENS } from '../../../../configs/constants'
import { UserMongoEntity } from './user.entity'

export const connectionProvider = [
	{
		provide: PROVIDER_TOKENS.USER_MODEL,
		useFactory: (connection: Connection) => connection.model(UserMongoEntity.collection, UserMongoEntity.schema),
		inject: [PROVIDER_TOKENS.DATABASE_CONNECTION],
	},
]
