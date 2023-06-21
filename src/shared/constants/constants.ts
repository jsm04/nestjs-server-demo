export const ROLES = {
	super_admin: 'super_admin',
	admin: 'admin',
	member: 'member',
	user: 'user',
} as const

export const availableRoles = Object.values(ROLES)


