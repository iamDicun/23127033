import { eq, and, count } from 'drizzle-orm';
import db from '../db/index.js';
import { tasks } from '../db/schema.js';

const service = {
  create: async function (task) {
    const result = await db.insert(tasks).values(task).returning();
    return result[0];
  },

  findById: async function (id) {
    const result = await db.select().from(tasks).where(eq(tasks.id, id));
    return result[0];
  },

  buildWhere: function (filters = {}) {
    const where = [];
    if (filters.categoryId !== undefined) {
      where.push(eq(tasks.categoryId, filters.categoryId))
    }
    return and(...where);
  },

  findAll: async function (filters = {}, offset = 0, limit = 100) {
    return db.select().from(tasks).where(this.buildWhere(filters)).offset(offset).limit(limit);
  },

  countAll: async function (filters = {}) {
    return (await db.select({ count: count() }).from(tasks).where(this.buildWhere(filters)))[0].count;
  },
};

export default service;