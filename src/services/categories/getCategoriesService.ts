import { Category } from '../../models';

export class GetCategoriesService {
  async execute(query: any, limit: number, since: number): Promise<{ total: number; categories: any[] }> {
    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query).populate('name').skip(since).limit(limit),
    ]);

    return { total, categories };
  }
}

