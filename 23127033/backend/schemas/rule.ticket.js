import z from 'zod';
import categoryService from '../services/category.js';
import customerService from '../services/customer.js';

export default z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be at most 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be at most 1000 characters'),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).default('open'),
  priority: z.enum(['low', 'medium', 'high']),
  customerId: z.number({ required_error: 'Customer ID is required' }),
  categoryId: z.number({ required_error: 'Category ID is required' }),
}).refine(async (data) => {
  const category = await categoryService.findById(data.categoryId);
  return !!category;
}, {
  message: 'Category does not exist',
  path: ['categoryId'],
}).refine(async (data) => {
  const customer = await customerService.findById(data.customerId);
  return !!customer;
}, {
  message: 'Customer does not exist',
  path: ['customerId'],
});