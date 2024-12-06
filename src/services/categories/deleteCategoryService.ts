import { Category } from '../../models';

export class DeleteCategoryService {
  async execute(id: string): Promise<any> {
    return Category.findByIdAndUpdate(id, { status: false }, { new: true });
  }
}
