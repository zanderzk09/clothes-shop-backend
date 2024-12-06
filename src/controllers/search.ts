import { Request, Response } from 'express';
import { ProductSearchService } from '../services/searchs';

export class ProductController {
  private productSearchService = new ProductSearchService();

  async searchProducts(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    try {
      const productNames = await this.productSearchService.search(name);
      
      if (productNames.length === 0) {
        res.status(404).json({
          msg: 'No products found matching the search criteria',
        });
        return;
      }

      res.json({ products: productNames });
    } catch (error) {
      console.error('Error searching for products:', error);
      res.status(500).json({
        msg: 'Internal server error',
      });
    }
  }
}




