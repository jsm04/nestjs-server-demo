import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database/database.module'
import { SharedModule } from '../../shared/shared.module'
import { UsersDbConnection } from './entities/mongodb/users-connection.provider'
import { MongodbUserRepository } from './entities/mongodb/users.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
    imports: [DatabaseModule, SharedModule],
    providers: [UsersDbConnection, UsersService, MongodbUserRepository],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
