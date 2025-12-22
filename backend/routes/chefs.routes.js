import { Router }  from 'express';
import chefController from '../controllers/chefs.controller.js';

const router = Router();

router.get('/', chefController.getAllChefs);

export default router;