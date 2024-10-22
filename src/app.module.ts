import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'
import { ConfigsModule } from './configs/configs.module'
import { UsersModule } from './modules/Users/users.module'
import { AuthModule } from './modules/Auth/auth.module'

@Module({
    imports: [
        UsersModule,
        ConfigsModule,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
