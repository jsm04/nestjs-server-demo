import {IsAlphanumeric,IsEmail,IsNotEmpty,IsString,MaxLength,MinLength} from 'class-validator'
import {User} from '../entities/user.interface'

export class CreateUserDTOimpl implements User {
	@MaxLength(32)
	@IsString()
	@IsNotEmpty()
	firstname: string
	@MaxLength(20)
	@IsString()
	@IsNotEmpty()
	lastname: string
	@IsNotEmpty()
	age: number
	@IsEmail()
	@IsNotEmpty()
	email: string
	@IsString()
	@IsNotEmpty()
	username: string
	@MaxLength(16)
	@MinLength(6)
	@IsAlphanumeric()
	@IsNotEmpty()
	password?: string
	@IsString()
	@IsNotEmpty()
	sex: string
}
