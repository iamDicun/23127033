import { Router } from 'express';
import ticketController from '../controllers/ticket.js';
import validation from '../middlewares/validation.js';
import ruleTicket from '../schemas/rule.ticket.js';

const route = new Router();

// GET: List tickets with filters and pagination
route.get('/', ticketController.list);

// GET: Get single ticket
route.get('/:id', ticketController.get);

// POST: Create new ticket
route.post('/', validation(ruleTicket), ticketController.create);

export default route;
