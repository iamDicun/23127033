import db from '../db/index.js';
import { categories } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';

const services = {
    // Get all users
    getAllCate: async () => {
        return await db.select({
            category_id: categories.category_id,
            name: categories.name,
        }).from(categories);
    },

    getCateById: async (id) => {
        const result = await db.select().from(categories).where(eq(categories.category_id, id));
        return result[0];
    },
}

export default services;