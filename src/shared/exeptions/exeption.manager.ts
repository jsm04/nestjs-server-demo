import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { FslogService } from '../services/fslog.service'

const mongoDbErrorIndex = {
	'11000': (key: string) => `${key} already in use.`,
}

@Injectable()
export class ControllerExeptionManager {
	@Inject(FslogService)
	private _fsLogger: FslogService

	public handleError(e: any) {
		const isMongoDbError = e.name === 'MongoServerError'

		if (isMongoDbError) {
			this.handleMongoError(e)
		}

		throw e
	}

	private handleMongoError(e: MongoDbError) {
		if (process.env.NODE_ENV === 'development') {
			console.log(e)
			this._fsLogger.debug(e)
		}
		const handler = mongoDbErrorIndex[e.code]

		if (!handler) {
			this._fsLogger.error(e)
			throw new InternalServerErrorException()
		}

		const pattern = Object.keys(e.keyPattern)[0]
		const response = handler(pattern)

		throw new ConflictException(response)
	}
}
