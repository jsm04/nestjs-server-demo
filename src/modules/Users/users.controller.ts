import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { ExceptionManager } from '../../shared/exceptions/exception.manager'
import { MongoObjectIdValidationPipe } from '../../shared/pipes/id-validation.pipe'
import { ServerResponse } from '../../shared/types'
import { CreateUserDTO } from '../Auth/dto/create-user.dto'
import { UsersService } from './users.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import { RequireRoleGuard } from '../../shared/decorators/roles.decorator'
import { RequireJwt } from '../../shared/decorators/jwt.decorator'

@Controller('users')
export class UsersController {
    @Inject(ExceptionManager)
    private controllerExeptionManager: ExceptionManager

    constructor(private readonly usersService: UsersService) {}

    @Get('list')
    @HttpCode(HttpStatus.OK)
    async listUsers() {
        try {
            const payload = await this.usersService.list()
            return <ServerResponse<typeof payload>>{
                message: 'Success',
                data: payload,
            }
        } catch (e) {
            this.controllerExeptionManager.handle(e)
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id', MongoObjectIdValidationPipe) id: ObjectId) {
        try {
            const payload = this.usersService.getById(id)
            return <ServerResponse<typeof payload>>{
                message: 'Success',
                data: payload,
            }
        } catch (e) {
            this.controllerExeptionManager.handle(e)
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        try {
            const payload = await this.usersService.create(createUserDTO)
            return <ServerResponse<typeof payload>>{
                message: 'Resourse created',
                data: payload,
            }
        } catch (e) {
            this.controllerExeptionManager.handle(e)
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateUser(@Param('id', MongoObjectIdValidationPipe) id: ObjectId, @Body() updateUserDTO: UpdateUserDTO) {
        try {
            const payload = await this.usersService.update(id, updateUserDTO)
            return <ServerResponse<typeof payload>>{
                message: 'Resourse updated',
                data: payload,
            }
        } catch (e) {
            this.controllerExeptionManager.handle(e)
        }
    }
}
