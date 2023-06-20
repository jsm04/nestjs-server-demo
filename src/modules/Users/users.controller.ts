import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { ForbiddenException } from '@nestjs/common/exceptions'
import { ObjectId } from 'mongoose'
import { Public } from '../../shared/decorators/public.decorator'
import { ControllerExeptionManager } from '../../shared/exeptions/exeption.manager'
import { MongoObjectIdValidationPipe } from '../../shared/pipes'
import { MockService } from '../../shared/services/mock.service'
import { CreateUserDTO } from '../Auth/dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	@Inject(MockService)
	private mockService: MockService
	@Inject(ControllerExeptionManager)
	private controllerExeptionManager: ControllerExeptionManager

	constructor(private readonly usersService: UsersService) {}

	@Public()
	@Get('list')
	async listUsers() {
		try {
			return await this.usersService.list()
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Get(':id')
	async getById(@Param('id', MongoObjectIdValidationPipe) id: ObjectId) {
		try {
			return this.usersService.getById(id)
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Post('')
	async createUser(@Body() createUserDTO: CreateUserDTO) {
		try {
			return await this.usersService.create(createUserDTO)
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Get('/generate')
	async generateUser() {
		try {
			if (process.env.NODE_ENV !== 'development') {
				throw new ForbiddenException('Endpoint not available')
			}
			return await this.usersService.create(this.mockService.createTestUser())
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}
}
