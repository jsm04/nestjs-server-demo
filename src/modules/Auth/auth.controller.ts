import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ControllerExeptionManager } from '../../shared/exeptions/exeption.manager'
import { UsersService } from '../Users/users.service'
import { AuthService } from './auth.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { LoginUserDTO } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
	@Inject()
	private controllerExeptionManager: ControllerExeptionManager

	constructor(private authService: AuthService) {}

	@Post('register')
	async register(@Body() createUserDTO: CreateUserDTO) {
		try {
			await this.authService.createUser(createUserDTO)
			return 'User created'
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}

	@Post('login')
	async login(@Body() loginUserDTO: LoginUserDTO) {
		try {
			return await this.authService.login(loginUserDTO)
		} catch (e) {
			this.controllerExeptionManager.handleError(e)
		}
	}
}
