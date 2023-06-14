import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { SharedModule } from '../shared/shared.module'
import { usersProviders } from './entities/mongoDb/user.provider'
import { UsersMongoRepositoryImpl } from './entities/mongoDb/users.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [UsersService, UsersMongoRepositoryImpl, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
