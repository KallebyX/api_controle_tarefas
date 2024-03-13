import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/tasksController';

const router = express.Router();

// Rotas para tarefas
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
