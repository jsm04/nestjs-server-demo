import { Module } from '@nestjs/common'
import { mongoDbConnectionProvider } from './mongoDb-connection.provider'

@Module({
	providers: [mongoDbConnectionProvider],
	exports: [mongoDbConnectionProvider],
})
export class DatabaseModule {}
