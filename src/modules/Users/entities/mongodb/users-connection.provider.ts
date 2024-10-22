import { Connection } from 'mongoose'
import { MONGODB_CONNECTION, USER_MODEL } from '../../../../shared/constants/providers'
import { MongodbUserEntity } from './user.entity'
import { Provider } from '@nestjs/common'

export const UsersDbConnection = <Provider>{
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model(MongodbUserEntity.collection, MongodbUserEntity.schema),
    inject: [MONGODB_CONNECTION],
}
