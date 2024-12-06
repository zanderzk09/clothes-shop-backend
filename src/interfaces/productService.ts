export interface ProductService {

  productByIdExists(id: string): Promise<boolean>;
  
}