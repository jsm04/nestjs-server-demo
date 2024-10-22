import { ConfigService } from '@nestjs/config'
import * as mongoose from 'mongoose'
import { MONGODB_CONNECTION } from '../shared/constants/providers'
import { Provider } from '@nestjs/common'

export const mongodbConnectionProvider = <Provider>{
    provide: MONGODB_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
        const mongodbConnectionUri = configService.get<'string'>('mongodb.uri')
        return mongoose.connect(mongodbConnectionUri)
    },
}
