import { Router } from 'express';
import customerController from '../controllers/customer.js';

const route = new Router();

// GET: List customers
route.get('/', customerController.list);

export default route;
