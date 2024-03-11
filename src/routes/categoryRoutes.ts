import express from 'express';
import { createCategory, deleteCategory } from '../controllers/categoriesController';

const router = express.Router();

// Rota para criar uma categoria
router.post('/', async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para excluir uma categoria pelo ID
router.delete('/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);
  try {
    await deleteCategory(categoryId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
