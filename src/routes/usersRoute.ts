import { Router } from 'express';
import { check } from 'express-validator';

import { 
  validateFields, 
  validateJWT, 
  hasRole, 
  isAdminRole 
} from '../middlewares';

import { 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser, 
  patchUser 
} from '../controllers';

import { 
  isValidRole, 
  emailExists, 
  userByIdExists 
} from '../helpers';

const userRouter = Router();


userRouter.get('/', getUser);

userRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'Invalid email format').isEmail(),
    check('email').custom(emailExists), 
    check('role').custom(isValidRole), 
    validateFields, 
  ],
  createUser
);

userRouter.put(
  '/:id',
  [
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(userByIdExists), 
    check('role').custom(isValidRole),
    validateFields,
  ],
  updateUser
);

userRouter.delete(
  '/:id',
  [
    validateJWT, 
    isAdminRole, 
    hasRole('ADMIN_ROLE', 'SELL_ROLE'), 
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(userByIdExists), 
    validateFields,
  ],
  deleteUser
);

userRouter.patch('/', patchUser);

export { userRouter };
