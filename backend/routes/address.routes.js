import { Router } from 'express';
import addressController from '../controllers/address.controller.js';

const router = Router();

// Get all addresses
router.get('/', addressController.getAllAddresses);

// Get address by ID
router.get('/:id', addressController.getAddressById);

// Create new address
router.post('/', addressController.createAddress);

// Update address by ID
router.put('/:id', addressController.updateAddress);

// Delete address by ID
router.delete('/:id', addressController.deleteAddress);

export default router;