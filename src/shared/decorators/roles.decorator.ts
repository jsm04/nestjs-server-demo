import { SetMetadata } from '@nestjs/common'
import { ROLE_KEY } from '../constants/keys'
import { AuthenticatedRoles } from '../types'

export const RequireRoleGuard = (role: AuthenticatedRoles) => SetMetadata(ROLE_KEY, role)
