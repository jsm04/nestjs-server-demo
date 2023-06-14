import { Injectable } from '@nestjs/common'
import { Logger, createLogger, format, transports } from 'winston'

@Injectable()
export class CustomLogger {
	private logger: Logger
	private directory = process.env.LOGS_DIR

	constructor() {
		this.logger = createLogger({
			format: format.combine(
				format.prettyPrint(),
				format.align(),
				format.errors({ stack: true }),
				format.splat(),
				format.simple(),
			),
			transports: [
				new transports.File({ filename: `${this.directory}/error.log`, level: 'error' }),
				new transports.File({ filename: `${this.directory}/warn.log`, level: 'warn' }),
				new transports.File({ filename: `${this.directory}/debug.log`, level: 'debug' }),
				new transports.File({ filename: `${this.directory}/info.log`, level: 'info' }),
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


