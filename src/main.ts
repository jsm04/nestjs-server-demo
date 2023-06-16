import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'

bootstrap()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const port = configService.get('PORT')

	app.setGlobalPrefix('api/v1')

	app.use(compression())
	app.enableCors()
	app.use(helmet())

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	)
	await app.listen(port)
}
