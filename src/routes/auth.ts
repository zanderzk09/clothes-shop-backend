import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares';
import { login } from '../controllers';

const authRouter = Router();

authRouter.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields, 
  ],
  login 
);

export { authRouter };
