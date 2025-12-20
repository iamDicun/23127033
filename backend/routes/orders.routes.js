import { Router } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orders.controller.js';

const router = Router();

// Get all orders
router.get('/', getAllOrders); // Khi lấy kèm theo order items, sử dụng truy vấn với JOIN trong controller

// Get order by ID
router.get('/:id', getOrderById);

// Create new order
router.post('/', createOrder);

// Update order by ID
router.put('/:id', updateOrder);

// Delete order by ID
router.delete('/:id', deleteOrder);

export default router;