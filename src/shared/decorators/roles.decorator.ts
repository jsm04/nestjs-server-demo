import { SetMetadata } from '@nestjs/common'
import { AuthenticatedRoles } from '../types'
import { ROLES_ENUM } from '../constants/constants'

export const ROLE_METADATA_KEY = Symbol('role')
export const RequireRoleGuard = (roleEnumKey: AuthenticatedRoles) => SetMetadata(ROLE_METADATA_KEY, ROLES_ENUM[roleEnumKey])
