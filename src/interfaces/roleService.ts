export interface RoleService {
  
  isValidRole(role: string): Promise<boolean>;

}