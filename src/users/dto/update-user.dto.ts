import { IsEmail, IsNumber, IsString } from 'class-validator'
import { User } from '../entities/user.interface'

export type UpdateUserDTO = Partial<Omit<User, 'password' | 'username' | 'sex'>>

export class UpdateUserDTOimpl implements UpdateUserDTO {
	@IsString()
	firstname?: string
	@IsString()
	lastname?: string
	@IsNumber()
	age?: number
	@IsEmail()
	email?: string
}
