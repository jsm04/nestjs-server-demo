import { Inject, Injectable } from '@nestjs/common'
import { Model, ObjectId } from 'mongoose'
import { UsersRepository } from 'src/database/interfaces/user.repository'
import { MongoDbRepository } from '../../../../database/mongoDb/abstract.repository'
import { PROVIDERS } from '../../../../shared/constants/tokens'
import { UserDocument } from './user.entity'

@Injectable()
export class UsersMongoRepository extends MongoDbRepository<UserDocument> implements UsersRepository<UserDocument, ObjectId> {
	constructor(@Inject(PROVIDERS.USER_MODEL) private userModel: Model<UserDocument>) {
		super(userModel)
	}

	async getByUsername(username: string, projection?: Record<string, unknown>): Promise<UserDocument | null> {
		return await super.getOne({ username: username }, projection)
	}

	async getByEmail(email: string, projection?: Record<string, unknown>): Promise<UserDocument | null> {
		return await super.getOne({ email: email }, projection)
	}
}
