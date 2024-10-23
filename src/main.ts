import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

bootstrap()

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const port = configService.get('port')

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
    const config = new DocumentBuilder()
        .setTitle('API Docs')
        .setDescription('Generic API description')
        .setVersion('1.0')
        .addTag('Endpoints')
        .build()

    const documentFactory = () => SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, documentFactory)

    await app.listen(port)
}
