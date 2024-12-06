export class RoleValidator {
  static isAdmin(user: { role: string }): boolean {
    return user.role === 'ADMIN_ROLE';
  }

  static hasRoles(user: { role: string }, roles: string[]): boolean {
    return roles.includes(user.role);
  }
}


