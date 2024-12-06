import { Category } from '../../models';

export class GetCategoryByIdService {
  async execute(id: string): Promise<any> {
    return Category.findById(id).populate('name');
  }
}
