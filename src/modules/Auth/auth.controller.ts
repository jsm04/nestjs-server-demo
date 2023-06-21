import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { RequireRoleGuard } from '../../shared/decorators'
import { Public } from '../../shared/decorators/public.decorator'
import { ControllerExeptionManager } from '../../shared/exeptions/exeption.manager'
import { ServerResponse, SingedUserRequest } from '../../shared/types'
import { AuthService } from './auth.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { LoginUserDTO } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
	@Inject()
	private controllerExeptionManager: ControllerExeptionManager

	constructor(private authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	@Public()
	async register(@Body() createUserDTO: CreateUserDTO) {
		try {
			const payload = await this.authService.register(createUserDTO)
			return <ServerResponse<typeof payload>>{
				statusCode: HttpStatus.CREATED,
				message: 'User registered successfully',
				data: payload,
			}
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Post('login')
	@Public()
	async login(@Body() loginUserDTO: LoginUserDTO) {
		try {
			const payload = await this.authService.login(loginUserDTO)
			return <ServerResponse<typeof payload>>{
				statusCode: HttpStatus.OK,
				message: 'User loged successfully',
				data: payload,
			}
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Get('profile')
	@RequireRoleGuard('admin')
	getProfile(@Request() req: SingedUserRequest<ObjectId>) {
		return req.user
	}
}
