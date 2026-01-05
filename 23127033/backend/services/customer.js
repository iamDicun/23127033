import { eq } from 'drizzle-orm';
import db from '../db/index.js';
import { customers } from '../db/schema.js';

const service = {
  findAll: async function() {
    return db.select().from(customers);
  },

  findById: async function (id) {
    const result = await db.select().from(customers).where(eq(customers.id, id));
    return result[0];
  },
};

export default service;
