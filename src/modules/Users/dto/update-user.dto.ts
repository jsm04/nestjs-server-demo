import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { User } from '../entities/user.interface'

export class UpdateUserDTO implements Partial<Omit<User, 'lastname' | 'sex' | 'role' | 'age'>> {
    @MaxLength(32)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstname: string
    @MaxLength(254)
    @MinLength(3)
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string
    @MaxLength(64)
    @MinLength(8)
    @IsAlphanumeric()
    @IsNotEmpty()
    @IsOptional()
    password: string
    @MaxLength(32)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username: string
}
