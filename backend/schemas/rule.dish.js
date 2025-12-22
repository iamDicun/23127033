import z from 'zod';
import {dishes} from '../db/schema.js'

export const dishSchema = z.object({
    dish_name: z.string().min(1).max(500, 'Toi da 500 ki tu'),
    description: z.string().min(50, 'Toi thieu 50 ki tu'),
    image_url: z.string().url().max(1000, 'Toi da 1000 ki tu'),
    rating: z.number().gte(0.0).lte(5.0),
    total_reviews: z.number().int().gte(0).default(0).optional(),
    preparation_time_minutes: z.number().int().gte(1),
    serving_size: z.number().int().gte(1).default(1).optional(),
    current_price: z.number().multipleOf(0.01).gte(0),
    original_price: z.number().multipleOf(0.01),
    is_featured: z.boolean().default(false).optional(),
});