import express from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = express.Router();

// Rota para criar uma nova categoria
router.post('/categories', CategoryController.createCategory);

// Rota para deletar uma categoria específica pelo ID
router.delete('/categories/:id', CategoryController.deleteCategory);

export default router;
