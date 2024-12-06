import { Category } from '../../models';

export class CategoryValidationService {
  async validateCategoryExists(categoryName: string): Promise<string> {
    const category = await Category.findOne({ name: categoryName.toUpperCase() });
    if (!category) {
      throw new Error(`Category ${categoryName} does not exist`);
    }
    return category._id.toString();
  }

  async execute(categoryName: string): Promise<string> {
    return this.validateCategoryExists(categoryName);
  }
}


