import { Request, Response, NextFunction } from 'express';

import { RoleValidator } from '../helpers';


interface AuthenticatedRequest extends Request {
  user?: {
    role: string;
    name: string;
  };
}

export const isAdminRole = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(500).json({
      success: false,
      msg: 'Token must be validated before verifying the role',
    });
    return;
  }

  if (!RoleValidator.isAdmin(req.user)) {
    res.status(401).json({
      success: false,
      msg: `${req.user.name} is not an administrator - You cannot perform this action`,
    });
    return;
  }

  next();
};

export const hasRole = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(500).json({
        success: false,
        msg: 'Token must be validated before verifying roles',
      });
      return;
    }

    if (!RoleValidator.hasRoles(req.user, roles)) {
      res.status(401).json({
        success: false,
        msg: `This action requires one of these roles: ${roles.join(', ')}`,
      });
      return;
    }

    next();
  };
};


