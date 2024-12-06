import { Router } from 'express';
import { check } from 'express-validator';
import { Request, Response } from 'express'; 

import { validateFields } from '../middlewares';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers'; 
import { validateCategoryExists } from '../middlewares/validateCategoryExists';


const categoriesRouter = Router();

categoriesRouter.get('/', (req: Request, res: Response) => getCategories(req, res));

categoriesRouter.get(
  '/:id',
  [
    check('id', 'Not a valid Mongo ID').isMongoId(),
    validateFields,
    validateCategoryExists,
  ],
  (req: Request, res: Response) => getCategoryById(req, res)
);

categoriesRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  (req: Request, res: Response) => createCategory(req, res)
);

categoriesRouter.put(
  '/:id',
  [
    check('id', 'Not a valid Mongo ID').isMongoId(),
    validateFields,
    validateCategoryExists,
    check('name', 'Name is required').not().isEmpty(),
  ],
  (req: Request, res: Response) => updateCategory(req, res)
);

categoriesRouter.delete(
  '/:id',
  [
    check('id', 'Not a valid Mongo ID').isMongoId(),
    validateFields,
    validateCategoryExists,
  ],
  (req: Request, res: Response) => deleteCategory(req, res)
);

export { categoriesRouter };




