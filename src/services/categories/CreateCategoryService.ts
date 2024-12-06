import { Category } from '../../models';

export class CreateCategoryService {
  async execute(name: string): Promise<any> {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      throw new Error(`The category "${categoryExists.name}" already exists`);
    }

    const category = new Category({ name });
    return category.save();
  }
}
