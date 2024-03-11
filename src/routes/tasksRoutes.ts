import express from 'express';
import { createTask, getTasks } from '../controllers/tasksController';
import { createTaskSchema } from '../models/validationSchemas';

const router = express.Router();

// Rota para criar uma tarefa
router.post('/', async (req, res) => {
  try {
    createTaskSchema.parse(req.body); // Validar o corpo da requisição
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para obter todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks(req.query.category as string);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
