export interface UserService {

  emailExists(email: string): Promise<boolean>;
  userByIdExists(id: string): Promise<boolean>;
  
}