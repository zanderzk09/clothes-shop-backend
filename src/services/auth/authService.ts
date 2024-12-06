import bcryptjs from 'bcryptjs';

import { AuthError } from '../../errors/authError';
import { generateJWT } from '../../helpers';
import { IUser } from '../../models/user';
import { User } from '../../models';

export class AuthService {
  async findUserByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) throw new AuthError('Incorrect email or password - email', 400);
    return user;
  }

  validateUserStatus(user: IUser): void {
    if (!user.status) {
      throw new AuthError('Incorrect user or password - status: false', 400);
    }
  }

  validatePassword(password: string, hashedPassword: string): void {
    const isValid = bcryptjs.compareSync(password, hashedPassword);
    if (!isValid) {
      throw new AuthError('Incorrect user or password - password', 400);
    }
  }

  async generateUserToken(userId: string): Promise<string> {
    return generateJWT(userId);
  }
}

