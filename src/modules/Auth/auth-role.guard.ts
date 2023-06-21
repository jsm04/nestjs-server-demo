import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY, ROLES, Roles } from '../../configs/constants'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRole = this.reflector.get<string>('role', context.getHandler())

		if (!requiredRole) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const userRole = request['user'].role

		if (!userRole) throw new UnauthorizedException()

		return this.matchPermissions(requiredRole, userRole)
	}

	matchPermissions(metadataRole: string, role: Roles) {
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
