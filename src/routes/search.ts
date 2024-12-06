import { Router, Request, Response } from 'express'; 
import { check } from 'express-validator';

import { ProductController } from '../controllers';
import { validateProductSearch } from '../middlewares/validateProductSearch';

const productController = new ProductController();
const searchRouter = Router();

searchRouter.post(
  '/search',
  [check('name', 'Name is required').not().isEmpty(), validateProductSearch],

  async (req: Request, res: Response): Promise<void> => {
    await productController.searchProducts(req, res); 
  }
);

export { searchRouter };

