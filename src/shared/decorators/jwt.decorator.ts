import { SetMetadata } from '@nestjs/common'

export const JWT_METADATA_KEY = Symbol('require_jwt')
export const RequireJwt = () => SetMetadata(JWT_METADATA_KEY, true)
