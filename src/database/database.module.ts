import { Module } from '@nestjs/common'
import { mongoDbConnectionProvider } from './mongodb-connection.provider'

@Module({
    providers: [mongoDbConnectionProvider],
    exports: [mongoDbConnectionProvider],
})
export class DatabaseModule {}
