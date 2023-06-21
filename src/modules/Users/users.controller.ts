import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common'
import { ForbiddenException } from '@nestjs/common/exceptions'
import { ObjectId } from 'mongoose'
import { RequireRoleGuard } from '../../shared/decorators'
import { ControllerExeptionManager } from '../../shared/exeptions/exeption.manager'
import { MongoObjectIdValidationPipe } from '../../shared/pipes/id-validation.pipe'
import { MockService } from '../../shared/services/mock.service'
import { ServerResponse } from '../../shared/types'
import { CreateUserDTO } from '../Auth/dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	@Inject(MockService)
	private mockService: MockService
	@Inject(ControllerExeptionManager)
	private controllerExeptionManager: ControllerExeptionManager

	constructor(private readonly usersService: UsersService) {}

	@Get('/generate')
	@HttpCode(HttpStatus.CREATED)
	@RequireRoleGuard('super_admin')
	async createMockUser() {
		try {
			if (process.env.NODE_ENV !== 'development') {
				throw new ForbiddenException('Endpoint not available')
			}

			if (await this.usersService.create(this.mockService.createTestUser())) {
				return <ServerResponse<null>>{
					statusCode: HttpStatus.CREATED,
					message: 'Resourse created',
					data: null,
				}
			}
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Get('list')
	@RequireRoleGuard('admin')
	async listUsers() {
		try {
			const payload = await this.usersService.list()
			return <ServerResponse<typeof payload>>{
				statusCode: HttpStatus.OK,
				message: 'Success',
				data: payload,
			}
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Get(':id')
	async getById(@Param('id', MongoObjectIdValidationPipe) id: ObjectId) {
		try {
			const payload = this.usersService.getById(id)
			return <ServerResponse<typeof payload>>{
				statusCode: HttpStatus.OK,
				message: 'Success',
				data: payload,
			}
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@RequireRoleGuard('admin')
	async createUser(@Body() createUserDTO: CreateUserDTO) {
		try {
			const payload = await this.usersService.create(createUserDTO)
			return <ServerResponse<typeof payload>>{
				statusCode: HttpStatus.CREATED,
				message: 'Resourse created',
				data: payload,
			}
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}
}
