import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { MockService } from '../shared/mock.service'
import { CreateUserDTOimpl } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('api/v1/users')
export class UsersController {
	@Inject(MockService)
	private mockService: MockService

	constructor(@Inject(UsersService) private readonly usersService: UsersService) {}
	@Get('/generate')
	async generateUser() {
		return await this.usersService.create(this.mockService.createTestUser())
	}

	@Get('/list')
	async getActiveUsers() {
		return await this.usersService.list()
	}

	@Get(':id')
	async getById(@Param('id') id: ObjectId) {
		return this.usersService.getById(id)
	}

	@Post('')
	createUser(@Body() createUserDTO: CreateUserDTOimpl) {
		return this.usersService.create(createUserDTO)
	}
}
