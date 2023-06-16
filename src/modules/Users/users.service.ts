import { Injectable } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { CreateUserDTO } from '../Auth/dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UsersMongoRepository } from './entities/mongoDb/users.repository'
import { User } from './entities/user.interface'

@Injectable()
export class UsersService {
	constructor(private userRepository: UsersMongoRepository) {}

	public async list(): Promise<User[]> {
		const query = await this.userRepository.list()
		return query
	}

	public async getById(id: ObjectId): Promise<User | null> {
		const query = await this.userRepository.getById(id)
		return query ?? null
	}

	public async getByEmail(email: string): Promise<User | null> {
		const query = await this.userRepository.getByEmail(email)
		return query ?? null
	}

	public async getByUsername(username: string): Promise<User | null> {
		const query = await this.userRepository.getByEmail(username)
		return query ?? null
	}

	public async create(user: CreateUserDTO): Promise<boolean> {
		const query = await this.userRepository.create(user)
		return query ? true : false
	}

	public async update(id: ObjectId, user: UpdateUserDTO): Promise<boolean> {
		const query = await this.userRepository.update(id, user)
		return query ? true : false
	}

	public async delete(id: ObjectId): Promise<User> {
		return await this.userRepository.delete(id)
	}
}
