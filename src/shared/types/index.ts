import { HttpStatus } from '@nestjs/common'
import { ROLES } from '../constants/constants'

export type ServerResponse<T> = {
    statusCode: HttpStatus
    message: string
    data: T
}

export type MongoDbError = Error & {
    index: number
    code: number
    keyPattern: Record<string, number>
    keyValue: Record<string, string>
}

export type Roles = keyof typeof ROLES

type AuthenticatedRolesOmit = Omit<typeof ROLES, 'user'>

export type AuthenticatedRoles = keyof AuthenticatedRolesOmit

export type TokenSingedContent<TKey> = {
    id: TKey
    email: string
    role: Roles
}

export type SingedUserRequest<TKey> = Request & Record<'user', TokenSingedContent<TKey>>
