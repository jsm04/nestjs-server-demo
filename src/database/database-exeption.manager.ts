import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CustomLogger } from '../shared/custom-logger.service'

const mongoDbErrorIndex = {
	'11000': (key: string) => `${key} is already in use.`,
}

@Injectable()
export class DatabaseExeptionManager {
	@Inject(CustomLogger)
	private _customLogger: CustomLogger

	public handleDatabaseExeption(e: any) {
		const isMongoDbError = e.name === 'MongoServerError'

		if (isMongoDbError) {
			this.handleMongoError(e)
		}
	}

	private handleMongoError(e: MongoDbError) {
		if (process.env.NODE_ENV === 'development') {
			console.log(e)
			this._customLogger.debug(e)
		}
		const handler = mongoDbErrorIndex[e.code]

		if (!handler) throw new InternalServerErrorException()

		const pattern = Object.keys(e.keyPattern)[0]
		const response = handler(pattern)

		throw new ConflictException(response)
	}
}
