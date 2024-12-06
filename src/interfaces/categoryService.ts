export interface CategoryService {

  categoryByIdExists(id: string): Promise<boolean>;
  
}