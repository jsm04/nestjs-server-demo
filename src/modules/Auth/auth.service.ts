import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../Users/users.service'
import { EncryptionService } from '../../shared/services/encryption.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private encryptionService: EncryptionService) {}

	async createUser(createUserDTO: CreateUserDTO): Promise<void> {
		const hashedPassword = await this.encryptionService.hashValue(createUserDTO.password)

		const user = { ...createUserDTO, password: hashedPassword }

		await this.usersService.create(user)
	}

	async validateCredentials(email: string, password: string): Promise<void> {
		const user = await this.usersService.getByEmail(email)
		
		if (!user) throw new BadRequestException('Email not found.')

		const hashValidation = await this.encryptionService.validateHash(password, user.password)

		if (!hashValidation) throw new UnauthorizedException('Invalid password.')
	}
}
