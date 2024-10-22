import { Connection } from 'mongoose'
import { MONGODB_CONNECTION, USER_MODEL } from '../../../../shared/constants/providers'
import { UserMongoEntity } from './user.entity'
import { Provider } from '@nestjs/common'

export const UsersDbConnection = <Provider>{
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model(UserMongoEntity.collection, UserMongoEntity.schema),
    inject: [MONGODB_CONNECTION],
}
