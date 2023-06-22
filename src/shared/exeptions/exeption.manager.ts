import { ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { FslogService } from '../services/fslog.service'
import { MongoDbError } from '../types'

const mongoDbErrorIndex = {
	'11000': (key: string) => `${key} already in use.`,
}

@Injectable()
export class ControllerExeptionManager {
	constructor(private _fsLogger: FslogService) {}

	public handleError(e: any) {
		const isMongoDbError = e.name === 'MongoServerError'

		if (isMongoDbError) {
			this.handleMongoError(e)
		}

		if (e instanceof HttpException) {
			throw e
		}

		if (e instanceof Error) {
			const buildError = {
				name: e.name,
				message: e.message,
				stack: e.stack ?? null,
			}
			this._fsLogger.error(buildError)
			throw new InternalServerErrorException('Something went wrong, try again later or contact administrators')
		}
	}

	private handleMongoError(e: MongoDbError) {
		const buildError = {
			name: e.name,
			message: e.message,
			stack: e.stack ?? null,
			index: e.index,
			code: e.code,
			keyPattern: e.keyPattern,
			keyValue: e.keyValue,
		}

		const handler = mongoDbErrorIndex[e.code]

		if (process.env.NODE_ENV === 'development') {
			console.log(e)
		}

		if (!handler) {
			this._fsLogger.error(buildError)
			throw new InternalServerErrorException()
		}

		const pattern = Object.keys(e.keyPattern)[0]
		const response = handler(pattern)

		throw new ConflictException(response)
	}
}
