import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_ENUM } from '../../shared/constants/constants'
import { Roles } from '../../shared/types'
import { ROLE_METADATA_KEY } from '../../shared/decorators/roles.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean {
        const requiredRoleLevel = this.reflector.getAllAndOverride<number>(ROLE_METADATA_KEY, [ctx.getHandler(), ctx.getClass()])

        // Escape the guard if no required role level
        if (!requiredRoleLevel) {
            return true
        }

        const request = ctx.switchToHttp().getRequest()
        const currentUserRoleLevelKey: Roles | undefined = request['user']?.role

        if (!currentUserRoleLevelKey || currentUserRoleLevelKey == 'user')
            throw new UnauthorizedException('Current role doesnt match required permission for accessing this resourse.')

        const userRoleLevel = ROLES_ENUM[currentUserRoleLevelKey]

        // Evaluate if required role level for the context is sufficient
        // (lower is better, meaning super user is equivalent to 1 )
        return requiredRoleLevel <= userRoleLevel
    }
}
