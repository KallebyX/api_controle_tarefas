import express from 'express';
import { TaskController } from '../controllers/TaskController';

const router = express.Router();

// Rota para criar uma nova tarefa
router.post('/tasks', TaskController.createTask);

// Rota para listar todas as tarefas (com filtro opcional por categoria)
router.get('/tasks', TaskController.getTasks);

// Rota para obter uma tarefa específica pelo ID
router.get('/tasks/:id', TaskController.getTaskById);

// Rota para atualizar uma tarefa específica pelo ID
router.patch('/tasks/:id', TaskController.updateTask);

// Rota para deletar uma tarefa específica pelo ID
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;
