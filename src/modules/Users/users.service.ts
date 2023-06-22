import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { CreateUserDTO } from '../Auth/dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UsersMongoRepository } from './entities/mongoDb/users.repository'
import { User } from './entities/user.interface'

@Injectable()
export class UsersService {
	constructor(private userRepository: UsersMongoRepository) {}

	public async list() {
		const query = await this.userRepository.list()
		return query
	}

	public async getById(id: ObjectId) {
		const query = await this.userRepository.getById(id)
		return query ?? null
	}

	public async getByEmail(email: string) {
		const query = await this.userRepository.getByEmail(email, { password: 1 })
		return query ?? null
	}

	public async getByUsername(username: string) {
		const query = await this.userRepository.getByEmail(username)
		return query ?? null
	}

	public async create(user: CreateUserDTO) {
		const query = await this.userRepository.create(user)
		return query ? true : false
	}

	public async update(id: ObjectId, user: UpdateUserDTO) {
		return await this.userRepository.update(id, user)
	}

	public async delete(id: ObjectId) {
		return await this.userRepository.delete(id)
	}
}
