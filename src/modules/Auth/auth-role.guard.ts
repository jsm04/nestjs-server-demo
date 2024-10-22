import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES } from '../../shared/constants/constants'
import { ROLE_KEY } from '../../shared/constants/keys'
import { Roles } from '../../shared/types'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string>(ROLE_KEY, ctx.getHandler())

        if (!requiredRole) {
            return true
        }

        const request = ctx.switchToHttp().getRequest()
        const userRole = request['user'].role

        if (!userRole) throw new UnauthorizedException()

        return this.matchPermissions(requiredRole, userRole)
    }

    private matchPermissions(metadataRole: string, role: Roles) {
        switch (metadataRole) {
            case ROLES.member:
                return role === ROLES.member || role === ROLES.admin || role === ROLES.super_admin
            case ROLES.admin:
                return role === ROLES.admin || role === ROLES.super_admin
            case ROLES.super_admin:
                return role === ROLES.super_admin
            default:
                break
        }
    }
}
