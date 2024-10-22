import { Module } from '@nestjs/common'
import { mongodbConnectionProvider } from './connection.provider'

@Module({
    providers: [mongodbConnectionProvider],
    exports: [mongodbConnectionProvider],
})
export class DatabaseModule {}
