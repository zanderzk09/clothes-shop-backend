import { Product } from '../../models';

export class ProductCommandService {
  async createProduct(data: any) {
    const product = new Product(data);
    await product.save();
    return product;
  }
}
