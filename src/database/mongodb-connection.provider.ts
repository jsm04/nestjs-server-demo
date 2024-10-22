import { ConfigService } from '@nestjs/config'
import * as mongoose from 'mongoose'
import { MONGODB_CONNECTION } from '../shared/constants/providers'
import { Provider } from '@nestjs/common'

export const mongoDbConnectionProvider = <Provider>{
    provide: MONGODB_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
        return mongoose.connect(configService.get<'string'>('mongoDb.uri'))
    },
}
