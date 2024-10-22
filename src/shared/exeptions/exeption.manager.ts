import { ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { FslogService } from '../services/fslog.service'
import { MongoDbError } from '../types'

const mongoDbErrorIndex = {
    '11000': (key: string) => `${key} already in use.`,
}

@Injectable()
export class ControllerExeptionManager {
    private isDevMode = process.env.NODE_ENV === 'development'

    constructor(private _fsLogger: FslogService) {}

    public handleError(error: any) {
        const isMongoDbError = error.name === 'MongoServerError'

        if (isMongoDbError) {
            this.handleMongoError(error)
        }

        if (error instanceof HttpException && this.isDevMode) {
            this._fsLogger.http({
                name: error.name,
                message: error.message,
                stack: error.stack ?? null,
                cause: error.cause,
                status: error.getStatus(),
            })
        } else if (error instanceof HttpException) {
            return error
        }

        if (error instanceof Error) {
            this._fsLogger.error({
                name: error.name,
                message: error.message,
                stack: error.stack ?? null,
            })
            throw new InternalServerErrorException(this.internalServerErrorMessage())
        }
    }

    private handleMongoError(error: MongoDbError) {
        const handler = mongoDbErrorIndex[error.code]

        if (this.isDevMode) {
            console.log(error)
        }

        if (!handler) {
            this._fsLogger.error({
                name: error.name,
                message: error.message,
                stack: error.stack ?? null,
                index: error.index,
                code: error.code,
                keyPattern: error.keyPattern,
                keyValue: error.keyValue,
            })
            throw new InternalServerErrorException(this.internalServerErrorMessage())
        }

        const pattern = Object.keys(error.keyPattern)[0]
        const response = handler(pattern)

        throw new ConflictException(response)
    }

    private internalServerErrorMessage = () => 'Something went wrong, try again later or contact an administrator'
}
