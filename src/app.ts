import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasksRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './middlewares/errorHandler';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o aplicativo Express
const app = express();

// Middleware de segurança
app.use(helmet());

// Configuração do middleware para analisar corpos de solicitação JSON
app.use(express.json());

// Rotas
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;
