import { Product, Category } from '../../models';

export class ProductQueryService {
  async findProductByName(name: string) {
    return await Product.findOne({ name });
  }

  async findCategoryByName(name: string) {
    return await Category.findOne({ name });
  }

  async getProducts(query: any, options: { skip: number; limit: number }) {
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate('name', 'price')
        .populate('category', 'availability')
        .populate('description')
        .skip(options.skip)
        .limit(options.limit),
    ]);

    return { total, products };
  }
}



