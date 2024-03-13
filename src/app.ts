import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import tasksRoutes from './routes/tasksRoutes'; // Ajuste o caminho conforme necessário
import categoryRoutes from './routes/categoryRoutes'; // Ajuste o caminho conforme necessário
import { AppError } from './errors/AppErrors'; // Ajuste o caminho conforme necessário

const app: Express = express();

// Middlewares básicos
app.use(express.json());
app.use(helmet()); // Adiciona segurança básica com Helmet

// Rotas
app.use('/api/tasks', tasksRoutes);
app.use('/api/categories', categoryRoutes);

// Middleware para tratamento de erros não capturados
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(`[Error]: ${err.message}`);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
