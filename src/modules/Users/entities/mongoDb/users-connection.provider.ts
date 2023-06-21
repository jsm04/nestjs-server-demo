import { Connection } from 'mongoose'
import { PROVIDERS } from '../../../../shared/constants/tokens'
import { UserMongoEntity } from './user.entity'

export const UsersDbConnection = {
	provide: PROVIDERS.USER_MODEL,
	useFactory: (connection: Connection) => connection.model(UserMongoEntity.collection, UserMongoEntity.schema),
	inject: [PROVIDERS.MONGODB_CONNECTION],
}
