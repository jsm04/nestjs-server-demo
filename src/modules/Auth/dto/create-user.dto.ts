import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { User } from '../../Users/entities/user.interface'

export class CreateUserDTO implements Omit<User, 'role'> {
	@MaxLength(32)
	@MinLength(2)
	@IsString()
	@IsNotEmpty()
	firstname: string
	@MaxLength(32)
	@MinLength(2)
	@IsString()
	@IsNotEmpty()
	lastname: string
	@IsNumber()
	@IsNotEmpty()
	age: number
	@MaxLength(254)
	@MinLength(3)
	@IsEmail()
	@IsNotEmpty()
	email: string
	@MaxLength(32)
	@MinLength(4)
	@IsString()
	@IsNotEmpty()
	username: string
	@MaxLength(64)
	@MinLength(8)
	@IsAlphanumeric()
	@IsNotEmpty()
	password: string
	@IsString()
	@IsNotEmpty()
	sex: string
}
