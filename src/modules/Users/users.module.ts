import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database/database.module'
import { SharedModule } from '../../shared/shared.module'
import { UsersDbConnection } from './entities/mongoDb/users-connection.provider'
import { UsersMongoRepository } from './entities/mongoDb/users.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [DatabaseModule, SharedModule],
	providers: [UsersDbConnection, UsersService, UsersMongoRepository],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
