import { ISearchService } from '../../interfaces/searchService';
import { Product } from '../../models';
import { TranslationService } from './translationService';

export class ProductSearchService implements ISearchService {
  private translationService = new TranslationService();

  async search(name: string): Promise<string[]> {
    const searchTerms = this.translationService.getSearchTerms(name.trim());
    const regexes = searchTerms.map(term => new RegExp(term, 'i'));

    const products = await Product.find();
    const matchingProducts = products.filter(product =>
      regexes.some(regex => regex.test(product.name))
    );

    return matchingProducts.map(product => product.name);
  }
}
