import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { CloudinaryStorageProvider } from '../providers/cloudinaryStorageProvider';
import { FileUploadService } from '../services/cloudinary';
import { IStorageProvider } from '../interfaces/IStorageProvider';
import { ProductCommandService } from '../services/products';
import { ProductErrorHandlerService } from '../errors/productsError';
import { ProductQueryService } from '../services/products';

const cloudinaryProvider: IStorageProvider = new CloudinaryStorageProvider();
const fileUploadService = new FileUploadService(cloudinaryProvider);
const productCommandService = new ProductCommandService();
const productQueryService = new ProductQueryService();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, status, price, description, category: categoryName } = req.body;

    const upperName = name.toUpperCase();

    const productDB = await productQueryService.findProductByName(upperName);
    if (productDB) {
      throw { statusCode: 400, message: `The product ${productDB.name} already exists` };
    }

    const categoryDB = await productQueryService.findCategoryByName(categoryName.toUpperCase());
    if (!categoryDB) {
      throw { statusCode: 400, message: `Category ${categoryName} does not exist` };
    }

    if (!req.files || !req.files.file) {
      throw { statusCode: 400, message: 'File is required' };
    }

    const file = req.files.file as UploadedFile;
    const imageUrl = await fileUploadService.uploadFile(file.data);

    const productData = {
      name: upperName,
      status,
      price,
      description,
      category: categoryDB._id,
      img: imageUrl,
    };

    const product = await productCommandService.createProduct(productData);
    res.status(201).json(product);

  } catch (error) {
    ProductErrorHandlerService.handleProductError(res, error);
  }
};



export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 100, since = 0, category } = req.query;
    const query: any = { status: true };

    if (category) {
      query.category = category;
    }

    const options = { skip: Number(since), limit: Number(limit) };

    const { total, products } = await productQueryService.getProducts(query, options);

    res.status(200).json({ total, products });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
