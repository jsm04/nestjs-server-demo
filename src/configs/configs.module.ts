import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env.development'],
			isGlobal: true,
			load: [configuration],
			cache: true,
		}),
	],
})
export class ConfigsModule {}
