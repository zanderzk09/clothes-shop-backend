import { Router } from 'express';
import { check } from 'express-validator';

import { createProduct, getProducts } from '../controllers/products';
import { validateFields, validateFile } from '../middlewares';

const productsRouter = Router();


productsRouter.get('/', getProducts);


productsRouter.post(
  '/',
  [
    validateFile, 
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('availability', 'Availability is required').not().isEmpty(),
    validateFields, 
  ],
  createProduct
);

export { productsRouter };
