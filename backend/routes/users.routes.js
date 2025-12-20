import { Router }  from 'express';
import userController from '../controllers/users.controller.js';
import { registerSchema } from '../schemas/rule.users.js';
import { loginSchema } from '../schemas/rule.users.js';
import { updateUserSchema } from '../schemas/rule.users.js';
import validate from '../middlewares/validation.js';

const router = Router();

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
/*router.get('/:id', userController.getUserById);

// Create new user
router.post('/', userController.createUser);

// Update user by ID
router.put('/:id', userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.deleteUser);*/

export default router;