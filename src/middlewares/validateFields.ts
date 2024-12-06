import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateFields = async ( req: Request, res: Response,next: NextFunction): Promise<void> => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array(), 
    });
    return
  }

  next();

};


