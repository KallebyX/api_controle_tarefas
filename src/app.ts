import express, { Express } from 'express';
import tasksRoutes from './routes/tasksRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import errorHandler from './middlewares/errorHandler';

const app: Express = express();
app.use(express.json());

app.use('/tasks', tasksRoutes);
app.use('/categories', categoriesRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
