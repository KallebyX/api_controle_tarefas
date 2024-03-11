import { Router } from 'express';
import * as tasksController from '../controllers/tasksController';

const router: Router = Router();

router.post('/', tasksController.createTask);
router.get('/', tasksController.getTasks);

export default router;
