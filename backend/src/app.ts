import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import { errorMiddleware } from './middlewares/error.middleware';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling()
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('Database conexion establecida');
    } catch (error) {
      console.error('Error al conectar database:', error);
      process.exit(1);
    }
  }

   private initializeMiddlewares(): void {
    // Security headers
   //this.app.use(helmet());
    
    // CORS configuration
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    }));
    
    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Request logging
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'User Management API',
      });
    });

    // APIs
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', userRoutes);

    // 404 
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

}

export default new App().app;