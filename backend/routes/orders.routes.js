import { Router } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orders.controller.js';

const router = Router();

// Get all orders (use ?include_items=true to include order items with product details)
router.get('/', getAllOrders);

// Get order by ID (use ?include_items=true to include order items with product details)
router.get('/:id', getOrderById);

// Create new order
router.post('/', createOrder);

// Update order by ID
router.put('/:id', updateOrder);

// Delete order by ID
router.delete('/:id', deleteOrder);

export default router;