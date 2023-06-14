import { Inject, Injectable } from '@nestjs/common'
import { Model, ObjectId } from 'mongoose'
import { DatabaseExeptionManager } from '../../../database/database-exeption.manager'
import { PROVIDER_TOKENS } from '../../../lib/global-constants'
import { UpdateUserDTOimpl } from '../../dto/update-user.dto'
import { User } from '../user.interface'

@Injectable()
export class UsersMongoRepositoryImpl implements UsersRepository<User, ObjectId> {
	@Inject(DatabaseExeptionManager) databaseExeptionManager: DatabaseExeptionManager
	constructor(@Inject(PROVIDER_TOKENS.USER_MODEL) private userModel: Model<User>) {}

	public async create(payload: User): Promise<User> {
		try {
			return await this.userModel.create(payload)
		} catch (error) {
			this.databaseExeptionManager.handleDatabaseExeption(error)
		}
	}

	public async get(id?: ObjectId): Promise<User[] | null> {
		let query: User[]

		if (!id) {
			query = await this.userModel.find({})
		} else {
			query = await this.userModel.findById(id)
		}

		return query ?? null
	}

	public async getByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email })
	}

	public async getByUsername(username: string): Promise<User> {
		return await this.userModel.findOne({ username })
	}

	public async update(id: ObjectId, data: UpdateUserDTOimpl): Promise<User> {
		const query = this.userModel.findOneAndUpdate(id, data)
		return query
	}

	public async delete(id: ObjectId): Promise<User> {
		return await this.userModel.findOneAndDelete(id)
	}
}
