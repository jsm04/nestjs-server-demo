import { HttpStatus } from '@nestjs/common'
import { ROLES_ENUM } from '../constants/constants'

export type ServerResponse<T> = {
    statusCode?: HttpStatus
    message: string
    data: T
}

export type MongodbError = Error & {
    index: number
    code: number
    keyPattern: Record<string, number>
    keyValue: Record<string, string>
}

export type Roles = keyof typeof ROLES_ENUM
type OmitRegularUser = Omit<typeof ROLES_ENUM, 'user'>
export type AuthenticatedRoles = keyof OmitRegularUser

export type SingedToken<TKey> = {
    id: TKey
    email: string
    role: Roles
}

export type SingedUserRequest<TKey> = Request & Record<'user', SingedToken<TKey>>
