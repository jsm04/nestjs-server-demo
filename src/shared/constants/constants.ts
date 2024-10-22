export const ROLES_ENUM = {
    super_admin: 1,
    admin: 2,
    member: 3,
    user: 4,
} as const

export const AVAILABLE_ROLES = Object.keys(ROLES_ENUM)
