import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database/database.module'
import { SharedModule } from '../../shared/shared.module'
import { connectionProvider } from './entities/mongoDb/user-connection.provider'
import { UsersMongoRepository } from './entities/mongoDb/users.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [DatabaseModule, SharedModule],
	providers: [UsersService, UsersMongoRepository, ...connectionProvider],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
