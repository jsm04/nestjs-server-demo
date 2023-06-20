import {Roles} from '../../../configs/constants'

export interface User {
	firstname: string
	lastname: string
	age: number
	email: string
	username: string
	password: string
	role: Roles
	sex: string
}
