import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ObjectId } from 'mongoose'
import { EncryptionService } from '../../shared/services/encryption.service'
import { TokenSingedContent } from '../../shared/types'
import { UserDocument } from '../Users/entities/mongoDb/user.entity'
import { UsersService } from '../Users/users.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { LoginUserDTO } from './dto/login-user.dto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private encryptionService: EncryptionService,
		private jwtService: JwtService,
	) {}

	public async register(createUserDTO: CreateUserDTO) {
		const hashedPassword = await this.encryptionService.hashValue(createUserDTO.password)
		const user = { ...createUserDTO, password: hashedPassword }
		await this.usersService.create(user)
		const recordUser = await this.usersService.getByEmail(createUserDTO.email)
		return await this.validateCredentials(recordUser.email, createUserDTO.password)
	}

	public async login(loginUserDTO: LoginUserDTO) {
		return await this.validateCredentials(loginUserDTO.email, loginUserDTO.password)
	}

	private async validateCredentials(email: string, password: string) {
		const user = await this.usersService.getByEmail(email)
		if (!user) throw new BadRequestException('Email not found.')
		const hashValidation = await this.encryptionService.validateHash(password, user.password)
		if (!hashValidation) throw new UnauthorizedException('Invalid password.')
		return await this.singJwtToken(user)
	}

	private async singJwtToken(user: UserDocument) {
		const payload: TokenSingedContent<ObjectId> = { id: user.id, email: user.email, role: user.role }
		return {
			accessToken: await this.jwtService.signAsync(payload),
			emissionDate: new Date().toUTCString(),
		}
	}
}
