import { Router } from 'express';
import taskController from '../controllers/task.js';
import taskSchema from '../schemas/task.js';
import validation from '../middlewares/validation.js';

const route = new Router();

// GET: List
route.get('/', taskController.list);

// GET: Fetch
route.get('/:id', taskController.get);

// POST: Create
route.post('/', validation(taskSchema), taskController.create);

export default route;