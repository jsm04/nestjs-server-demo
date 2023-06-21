import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Logger, createLogger, format, transports } from 'winston'

@Injectable()
export class FslogService {
	private logger: Logger
	private directory = process.env.LOGS_DIR

	constructor(private configService: ConfigService) {
		this.logger = createLogger({
			format: format.combine(
				format.prettyPrint(),
				format.align(),
				format.errors({ stack: true }),
				format.splat(),
				format.simple(),
			),
			transports: [
				new transports.File({ filename: `${this.configService.get<string>('logs_dir')}/error.log`, level: 'error' }),
				new transports.File({ filename: `${this.configService.get<string>('logs_dir')}/warn.log`, level: 'warn' }),
				new transports.File({ filename: `${this.configService.get<string>('logs_dir')}/debug.log`, level: 'debug' }),
				new transports.File({ filename: `${this.configService.get<string>('logs_dir')}/info.log`, level: 'info' }),
			],
		})
	}

	public error(message: unknown) {
		this.logger.error(message)
	}

	public warn(message: unknown) {
		this.logger.warn(message)
	}

	public debug(message: unknown) {
		this.logger.debug(message)
	}

	public info(message: unknown) {
		this.logger.info(message)
	}
}
