import { Response } from 'express';

interface IProductErrorDetails {
  statusCode: number;
  message: string;
  details?: string | object;
}

export class ProductErrorHandlerService {
  static handleProductError(res: Response, error: any): void {
    const statusCode = this.getStatusCode(error);

    if (error instanceof Error) {
      res.status(statusCode).json({
        msg: error.message,
        details: error.stack,
      });
    } else {
      const errorDetails: IProductErrorDetails = {
        statusCode: statusCode,
        message: error?.message || 'Internal Server Error',
        details: error?.details || null,
      };
      res.status(errorDetails.statusCode).json({
        msg: errorDetails.message,
        details: errorDetails.details,
      });
    }
  }

  private static getStatusCode(error: any): number {
    if (error && typeof error.statusCode === 'number') {
      return error.statusCode;
    }

    return 500;
  }
}

