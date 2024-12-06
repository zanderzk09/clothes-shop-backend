import { Request, Response } from 'express';

import {
  GetCategoriesService,
  GetCategoryByIdService,
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
} from '../services';
import { CategoriesHandlerService } from '../errors/categoriesError';

const getCategoriesService = new GetCategoriesService();
const getCategoryByIdService = new GetCategoryByIdService();
const createCategoryService = new CreateCategoryService();
const updateCategoryService = new UpdateCategoryService();
const deleteCategoryService = new DeleteCategoryService();

const categoriesHandlerService = new CategoriesHandlerService();

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 7, since = 0 } = req.query;
    const query = { status: true };
    const result = await getCategoriesService.execute(query, Number(limit), Number(since));
    categoriesHandlerService.handleSuccess(res, result);
  } catch (error) {
    categoriesHandlerService.handleError(res, error);
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService.execute(id);
    categoriesHandlerService.handleSuccess(res, category);
  } catch (error) {
    categoriesHandlerService.handleError(res, error);
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.body.name.toUpperCase();
    const category = await createCategoryService.execute(name);
    categoriesHandlerService.handleSuccess(res, category, 201);
  } catch (error) {
    categoriesHandlerService.handleError(res, error);
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const category = await updateCategoryService.execute(id, data);
    categoriesHandlerService.handleSuccess(res, category);
  } catch (error) {
    categoriesHandlerService.handleError(res, error);
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await deleteCategoryService.execute(id);
    categoriesHandlerService.handleSuccess(res, { msg: 'The category has been deleted', category });
  } catch (error) {
    categoriesHandlerService.handleError(res, error);
  }
};






