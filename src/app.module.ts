import { Module } from '@nestjs/common'
import { ConfigsModule } from './configs/configs.module'
import { UsersModule } from './users/users.module'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    UsersModule,
    ConfigsModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
