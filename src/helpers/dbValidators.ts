import { Role, User, Category, Product } from '../models';

export const isValidRole = async (role: string = ''): Promise<void> => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} is invalid`);
  }
};

export const emailExists = async (email: string = ''): Promise<void> => {
  const findEmail = await User.findOne({ email });
  if (findEmail) {
    throw new Error(`Email ${email} is already registered`);
  }
};

export const userByIdExists = async (id: string): Promise<void> => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`The user with ID ${id} does not exist`);
  }
};

export const categoryByIdExists = async (id: string): Promise<void> => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`ID ${id} does not exist in categories`);
  }
};

export const productByIdExists = async (id: string): Promise<void> => {
  try {
    const productExists = await Product.findById(id);
    if (!productExists) {
      throw new Error(`Product with ID ${id} does not exist`);
    }
  } catch (error: any) {
    throw new Error(`Error during product validation: ${error.message}`);
  }
};

export const allowedCollections = (collection: string = '', collections: string[]): boolean => {
  const includes = collections.includes(collection);
  if (!includes) {
    throw new Error(`The collection ${collection} is not valid. Allowed collections: ${collections}`);
  }
  return true;
};
