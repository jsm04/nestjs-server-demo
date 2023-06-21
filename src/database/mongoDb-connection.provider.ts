import { ConfigService } from '@nestjs/config'
import * as mongoose from 'mongoose'
import { PROVIDERS } from '../shared/constants/tokens'

export const mongoDbConnectionProvider = {
	provide: PROVIDERS.MONGODB_CONNECTION,
	inject: [ConfigService],
	useFactory: async (configService: ConfigService): Promise<typeof mongoose> =>
		mongoose.connect(configService.get<'string'>('mongoDb.uri')),
}
