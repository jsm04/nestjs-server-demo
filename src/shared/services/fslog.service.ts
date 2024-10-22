import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger, createLogger, format, transports } from 'winston'

@Injectable()
export class FslogService {
    private logger: Logger

    constructor(private configService: ConfigService) {
        this.logger = createLogger({
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp(),
                format.json(),
                format.splat(),
                format.prettyPrint(),
                format.align(),
            ),
            transports: [
                new transports.File({ filename: `${this.configService.get<string>('logs_dir')}/error.log`, level: 'error' }),
                new transports.File({ filename: `${this.configService.get<string>('logs_dir')}/http.log`, level: 'http' }),
                new transports.File({ filename: `${this.configService.get<string>('logs_dir')}/debug.log`, level: 'debug' }),
            ],
        })
    }

    public error(message: unknown) {
        this.logger.error(message)
    }

    public http(message: unknown) {
        this.logger.http(message)
    }

    public debug(message: unknown) {
        this.logger.debug(message)
    }
}
