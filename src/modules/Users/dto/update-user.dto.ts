import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { User } from '../entities/user.interface'

export class UpdateUserDTO implements Partial<Omit<User, 'password' | 'username' | 'sex'>> {
	@MaxLength(32)
	@IsString()
	firstname?: string
	@IsString()
	@MaxLength(32)
	lastname?: string
	@IsNumber()
	age?: number
	@MaxLength(254)
	@IsEmail()
	@IsNotEmpty()
	email?: string
}
