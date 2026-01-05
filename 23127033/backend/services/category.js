import { eq } from 'drizzle-orm';
import db from '../db/index.js';
import { categories } from '../db/schema.js';

const service = {
  findAll: async function() {
    return db.select().from(categories);
  },

  findById: async function (id) {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  },
};

export default service;