import { Module } from '@nestjs/common'
import { DatabaseExeptionManager } from './database-exeption.manager'
import { databaseProviders } from './database.provider'

@Module({
	providers: [...databaseProviders, DatabaseExeptionManager],
	exports: [...databaseProviders, DatabaseExeptionManager],
})
export class DatabaseModule {}
