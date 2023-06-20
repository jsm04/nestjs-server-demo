export const PROVIDER_TOKENS = {
	USER_MODEL: Symbol('USER_MODEL'),
	DATABASE_CONNECTION: Symbol('DATABASE_CONNECTION'),
}

export const IS_PUBLIC_KEY = 'isPublic'

export const ROLES = {
	super_admin: 'super_admin',
	admin: 'admin',
	member: 'member',
	user: 'user',
} as const

export type Roles = keyof typeof ROLES

export const availableRoles = Object.values(ROLES)