import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasksRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());

// Rotas
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

export default app;
