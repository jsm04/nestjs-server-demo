import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { SingedUserRequest } from '../../configs/constants'
import { RequireRole } from '../../shared/decorators'
import { Public } from '../../shared/decorators/public.decorator'
import { ControllerExeptionManager } from '../../shared/exeptions/exeption.manager'
import { AuthService } from './auth.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { LoginUserDTO } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
	@Inject()
	private controllerExeptionManager: ControllerExeptionManager

	constructor(private authService: AuthService) {}

	@Post('register')
	@Public()
	async register(@Body() createUserDTO: CreateUserDTO) {
		try {
			return await this.authService.register(createUserDTO)
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Post('login')
	@Public()
	async login(@Body() loginUserDTO: LoginUserDTO) {
		try {
			return await this.authService.login(loginUserDTO)
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Get('profile')
	@RequireRole('admin')
	getProfile(@Request() req: SingedUserRequest<ObjectId>) {
		return req.user
	}
}
