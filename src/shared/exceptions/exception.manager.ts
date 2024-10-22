import { ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { FilesystemLoggerService } from '../services/filesyslog.service'
import { MongodbError } from '../types'
import { MONGODB_ERROR_INDEX } from '../../database/mongodb/errors'

@Injectable()
export class ControllerExceptionManager {
    private isDevelopment = process.env.NODE_ENV === 'development'

    constructor(private logger: FilesystemLoggerService) {}

    handle(e: Error) {
        const isMongodbError = e.name === 'MongoServerError'

        if (isMongodbError) {
            this.handleMongodbError(e as MongodbError)
        }

        if (e instanceof HttpException && this.isDevelopment) {
            this.logger.http({
                name: e.name,
                message: e.message,
                stack: e.stack ?? null,
                cause: e.cause,
                status: e.getStatus(),
            })
        } else if (e instanceof HttpException) {
            return e
        }

        if (e instanceof Error) {
            this.logger.error({
                name: e.name,
                message: e.message,
                stack: e.stack ?? null,
            })
            throw new InternalServerErrorException(this.internalServerErrorMessage())
        }
    }

    private handleMongodbError(e: MongodbError) {
        const handler = MONGODB_ERROR_INDEX[e.code]

        if (!handler) {
            this.logger.error(e)
            throw new InternalServerErrorException(this.internalServerErrorMessage())
        }

        const pattern = Object.keys(e.keyPattern)[0]
        const response = handler(pattern)

        throw new ConflictException(response)
    }

    private internalServerErrorMessage = () => 'Something went wrong, try again later or contact an administrator'
}
