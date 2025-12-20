import db from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const services = {
    // Get all users
    getAllUsers: async () => {
        return await db.select().from(users);
    },
};

export default services;