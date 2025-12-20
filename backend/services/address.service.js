import db from '../db/index.js';
import { addresses } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const services = {
    // Get all addresses
    getAllAddresses: async () => {
        return await db.select().from(addresses);
    },
};

export default services;