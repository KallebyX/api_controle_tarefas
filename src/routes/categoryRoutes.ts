import express from 'express';
import { createCategory, deleteCategory } from '../controllers/categoriesController';

const router = express.Router();

// Rotas para categorias
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;
