import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Роут здоров'я з 1 лаби
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage()
  });
});

// Підключення ресурсів
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);

// Централізований обробник помилок (строго в кінці!)
app.use(errorHandler);

export default app;
