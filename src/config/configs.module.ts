import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { buildGlobalConfig } from '.'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development'],
            isGlobal: true,
            load: [buildGlobalConfig],
            cache: true,
        }),
    ],
})
export class ConfigsModule {}
