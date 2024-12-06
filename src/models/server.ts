import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dbConnection from '../database/config';
import { categoriesRouter, searchRouter, productsRouter, authRouter, userRouter } from '../routes';

class Server {
  private app: Application;
  private paths: { [key: string]: string };

  constructor() {
    this.app = express();
    this.paths = this.definePaths();

    this.initialize();
  }

  private definePaths(): { [key: string]: string } {
    return {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      users: '/api/users',
    };
  }

  private async initialize(): Promise<void> {
    await this.connectDatabase();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private async connectDatabase(): Promise<void> {
    try {
      await dbConnection();
      console.log('Base de datos conectada');
    } catch (error) {
      console.error('Error al conectar la base de datos:', error);
      process.exit(1);
    }
  }

  private configureMiddlewares(): void {
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
      })
    );

    this.app.use(express.json());

    this.app.use(express.static('public'));

    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true,
      })
    );
  }

  private configureRoutes(): void {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.categories, categoriesRouter);
    this.app.use(this.paths.products, productsRouter);
    this.app.use(this.paths.search, searchRouter);
    this.app.use(this.paths.users, userRouter);
  }

  public handler(req: Request, res: Response): void {
    this.app(req, res); 
  }
}

const server = new Server();
export const handler = server.handler.bind(server);


