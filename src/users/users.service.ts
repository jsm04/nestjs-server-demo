import { Inject, Injectable } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { CreateUserDTOimpl } from './dto/create-user.dto'
import { UpdateUserDTOimpl } from './dto/update-user.dto'
import { UsersMongoRepositoryImpl } from './entities/mongoDb/users.repository'
import { User } from './entities/user.interface'

@Injectable()
export class UsersService {
	constructor(
		@Inject(UsersMongoRepositoryImpl)
		private userRepository: UsersMongoRepositoryImpl,
	) {}

	public async list(): Promise<User[]> {
		const query = await this.userRepository.get()
		return query
	}

	public async getById(id: ObjectId): Promise<User[]> | null {
		const query = await this.userRepository.get(id)
		return query ?? null
	}

	public async create(user: CreateUserDTOimpl): Promise<boolean> {
		const query = await this.userRepository.create(user)
		return query ? true : false
	}

	public async update(id: ObjectId, user: UpdateUserDTOimpl): Promise<boolean> {
		const query = await this.userRepository.update(id, user)
		return query ? true : false
	}

	public async delete(id: ObjectId): Promise<User> {
		return await this.userRepository.delete(id)
	}
}
