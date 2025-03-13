import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { JWT_METADATA_KEY } from '../../shared/decorators/jwt.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService,
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const requireJwt = this.reflector.getAllAndOverride<boolean>(JWT_METADATA_KEY, [ctx.getHandler(), ctx.getClass()])

        if (!requireJwt) {
            return true
        }

        const request = ctx.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException('Token is missing from the request.')
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('jwt_secret'),
            })
            request['user'] = payload
        } catch {
            throw new UnauthorizedException('Invalid token')
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
