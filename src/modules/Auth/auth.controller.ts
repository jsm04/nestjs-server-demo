import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Request } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { ExceptionManager } from '../../shared/exceptions/exception.manager'
import { ServerResponse, SingedUserRequest } from '../../shared/types'
import { AuthService } from './auth.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { LoginUserDTO } from './dto/login-user.dto'
import { RequireRoleGuard } from '../../shared/decorators/roles.decorator'

@Controller('auth')
export class AuthController {
    @Inject()
    private controllerExeptionManager: ExceptionManager

    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDTO: CreateUserDTO) {
        try {
            const payload = await this.authService.register(createUserDTO)
            return <ServerResponse<typeof payload>>{
                message: 'User registered successfully',
                data: payload,
            }
        } catch (e) {
            this.controllerExeptionManager.handle(e)
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDTO: LoginUserDTO) {
        try {
            const payload = await this.authService.login(loginUserDTO)
            return <ServerResponse<typeof payload>>{
                message: 'User logged successfully',
                data: payload,
            }
        } catch (e) {
            this.controllerExeptionManager.handle(e)
        }
    }

    @Get('profile')
    @RequireRoleGuard('admin')
    getProfile(@Request() req: SingedUserRequest<ObjectId>) {
        return req.user
    }
}
