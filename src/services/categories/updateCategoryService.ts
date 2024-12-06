import { Category } from '../../models';

export class UpdateCategoryService {
  async execute(id: string, data: any): Promise<any> {
    data.name = data.name.toUpperCase();
    return Category.findByIdAndUpdate(id, data, { new: true });
  }
}
