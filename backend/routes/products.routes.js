import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = Router();

// Get all products
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

// Create new product
router.post('/', createProduct);

// Update product by ID
router.put('/:id', updateProduct);

// Delete product by ID
router.delete('/:id', deleteProduct);

export default router;