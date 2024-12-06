import { Response } from 'express';

export interface ICategoriesError {
  handleSuccess(res: Response, data: unknown, statusCode?: number): void;
  handleError(res: Response, error: unknown): void;
}

export class CategoriesHandlerService implements ICategoriesError {
  handleSuccess(res: Response, data: unknown, statusCode = 200): void {
    res.status(statusCode).json(data);
  }

  handleError(res: Response, error: unknown): void {
    console.error(error);

    // Verificamos si el error es un Error tradicional para extraer el mensaje
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message || 'Internal Server Error' });
    } else {
      res.status(500).json({ msg: 'An unknown error occurred' });
    }
  }
}

