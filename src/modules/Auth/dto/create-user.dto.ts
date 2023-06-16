import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { User } from '../../Users/entities/user.interface'

export class CreateUserDTO implements User {
	@MaxLength(32)
	@IsString()
	@IsNotEmpty()
	firstname: string
	@MaxLength(32)
	@IsString()
	@IsNotEmpty()
	lastname: string
	@IsNumber()
	@IsNotEmpty()
	age: number
	@MaxLength(254)
	@IsEmail()
	@IsNotEmpty()
	email: string
	@IsAlphanumeric()
	@IsNotEmpty()
	username: string
	@MaxLength(32)
	@MinLength(8)
	@IsAlphanumeric()
	@IsNotEmpty()
	password: string
	@IsString()
	@IsNotEmpty()
	sex: string
}
