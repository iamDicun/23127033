import { Router }  from 'express';
import dishController from '../controllers/dishes.controller.js';
import { dishSchema } from '../schemas/rule.dish.js';
import validate from '../middlewares/validation.js';

const router = Router();

router.post('/', validate(dishSchema), dishController.createChef);

router.get('/', dishController.getDish);
export default router;