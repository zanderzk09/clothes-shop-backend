import { Request, Response } from 'express';
import { AuthService } from '../services/auth';
import { AuthError } from '../errors/authError';

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await authService.findUserByEmail(email);
    authService.validateUserStatus(user);
    authService.validatePassword(password, user.password);
    const token = await authService.generateUserToken(user.id);

    res.json({ user, token });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({ msg: error.message });
    } else {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
};








