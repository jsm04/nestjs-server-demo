import { Inject, Injectable } from '@nestjs/common'
import { Model, ObjectId } from 'mongoose'
import { PROVIDERS } from '../../../../shared/constants/tokens'
import { UsersRepository } from '../../../../shared/types/interfaces'
import { UpdateUserDTO } from '../../dto/update-user.dto'
import { User } from '../user.interface'

@Injectable()
export class UsersMongoRepository implements UsersRepository<User, ObjectId> {
	constructor(@Inject(PROVIDERS.USER_MODEL) private userModel: Model<User>) {}

	public async create(payload: User): Promise<User> {
		return await this.userModel.create(payload)
	}

	public async list(): Promise<User[] | null> {
		const query = await this.userModel.find()
		return query ?? null
	}

	public async getById(id: ObjectId): Promise<User | null> {
		const query = await this.userModel.findById(id)
		return query ?? null
	}

	public async getByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email }).select('+password')
	}

	public async getByUsername(username: string): Promise<User> {
		return await this.userModel.findOne({ username })
	}

	public async update(id: ObjectId, data: UpdateUserDTO): Promise<User> {
		return await this.userModel.findOneAndUpdate(id, data)
	}

	public async delete(id: ObjectId): Promise<User> {
		return await this.userModel.findOneAndDelete(id)
	}
}
