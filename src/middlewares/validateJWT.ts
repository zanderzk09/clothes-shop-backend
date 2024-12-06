import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
    name: string;
    status: boolean;
  };
}

export const validateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  
  const token = req.header('x-token');

  if (!token) {
    res.status(401).json({
      success: false,
      msg: 'There is no token in the request',
    });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as jwt.JwtPayload;
    const uid = decoded.uid as string;

    const user = await User.findById(uid);

    if (!user) {
      res.status(401).json({
        success: false,
        msg: 'Invalid token - user does not exist',
      });
      return;
    }

    if (!user.status) {
      res.status(401).json({
        success: false,
        msg: 'Invalid token - user status is inactive',
      });
      return; 
    }

    req.user = user;
    next(); 
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      msg: 'Invalid token - verification failed',
    });
  }
};

