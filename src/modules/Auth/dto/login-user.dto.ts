import { IsAlphanumeric, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { User } from '../../Users/entities/user.interface'

export class LoginUserDTO implements Pick<User, 'email' | 'password'> {
	@MaxLength(254)
	@IsEmail()
	@IsNotEmpty()
	email: string
	@MaxLength(32)
	@MinLength(8)
	@IsAlphanumeric()
	@IsNotEmpty()
	password: string
}
