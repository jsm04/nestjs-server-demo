import { SetMetadata } from '@nestjs/common'
import { AuthenticatedRoles } from '../../configs/constants'

export const RequireRole = (role: AuthenticatedRoles) => SetMetadata('role', role)
