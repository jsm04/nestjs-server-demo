import { Module } from '@nestjs/common'
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'
import { ConfigsModule } from './config/configs.module'
import { UsersModule } from './modules/Users/users.module'
import { AuthModule } from './modules/Auth/auth.module'

@Module({
    imports: [UsersModule, ConfigsModule, ThrottlerModule.forRoot(), AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
