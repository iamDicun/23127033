import z from 'zod';
import categoryService from '../services/category.js';

export default z.object({
  title: z.string().min(3).max(50),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']),
  categoryId: z.number(),
}).refine(async (data) => {
  const category = await categoryService.findById(data.categoryId);
  // Exists => true
  return !!category;
}, {
  message: 'Category ID does not exist',
  path: ['categoryId'],
});
