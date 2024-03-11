import { Router } from 'express';
import * as tasksController from '../controllers/tasksController';

const router: Router = Router();

router.post('/', tasksController.createTask);
router.get('/', tasksController.getTasks);
router.get('/:id', tasksController.getTaskById);
router.patch('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

export default router;
