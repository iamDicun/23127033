import db from '../db/index.js';
import { chefs } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';

const services = {
    // Get all users
    getAllChefs: async () => {
        return await db.select({
            chef_id: chefs.chef_id,
            name: chefs.name,
            specialty: chefs.specialty,
        }).from(chefs);
    },

    getChefById: async (id) => {
        const result = await db.select().from(chefs).where(eq(chefs.chef_id, id));
        return result[0];
    },
};

export default services;