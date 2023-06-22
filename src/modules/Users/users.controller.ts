import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { Public, RequireRoleGuard } from '../../shared/decorators'
import { ControllerExeptionManager } from '../../shared/exeptions/exeption.manager'
import { MongoObjectIdValidationPipe } from '../../shared/pipes/id-validation.pipe'
import { ServerResponse } from '../../shared/types'
import { CreateUserDTO } from '../Auth/dto/create-user.dto'
import { UsersService } from './users.service'
import { UpdateUserDTO } from './dto/update-user.dto'

@Controller('users')
@RequireRoleGuard('admin')
export class UsersController {
	@Inject(ControllerExeptionManager)
	private controllerExeptionManager: ControllerExeptionManager

	constructor(private readonly usersService: UsersService) {}

	@Get('list')
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

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	async updateUser(@Param('id', MongoObjectIdValidationPipe) id: ObjectId, @Body() updateUserDTO: UpdateUserDTO) {
		try {
			const payload = await this.usersService.update(id, updateUserDTO)
			return <ServerResponse<typeof payload>>{
				statusCode: HttpStatus.OK,
				message: 'Resourse updated',
				data: payload,
			}
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}
}
