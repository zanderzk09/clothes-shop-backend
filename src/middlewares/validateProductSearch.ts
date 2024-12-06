import { Request, Response, NextFunction } from 'express';
import { ValidationService } from '../services/searchs';

export const validateProductSearch = (req: Request, res: Response, next: NextFunction): void => {
  const { name } = req.body;

  if (!ValidationService.validateSearchQuery(name)) {
    res.status(400).json({
      msg: 'A valid product name is required',
    });
    return;
  }
  next();
};
