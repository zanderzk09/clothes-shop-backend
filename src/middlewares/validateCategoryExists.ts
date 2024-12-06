import { Request, Response, NextFunction } from 'express';
import { CategoryValidationService } from '../services/categories';

const validateCategoryExistsService = new CategoryValidationService();

export const validateCategoryExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await validateCategoryExistsService.execute(id); 
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: 'An unknown error occurred' });
    }
  }
};

