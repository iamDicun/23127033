import { Router } from 'express';
import categoryController from '../controllers/category.js';

const route = new Router();

// GET: List ward
route.get('/', categoryController.list);

export default route;