import { eq, and, sql } from 'drizzle-orm';
import db from '../db/index.js';
import { tickets } from '../db/schema.js';

const service = {
  findAll: async function(filters = {}) {
    const { page = 1, limit = 5, customerId, categoryId } = filters;
    const offset = (page - 1) * limit;
    
    // Build base query with filters
    const conditions = [];
    if (customerId) {
      conditions.push(eq(tickets.customerId, parseInt(customerId)));
    }
    if (categoryId) {
      conditions.push(eq(tickets.categoryId, parseInt(categoryId)));
    }
    
    // Get total count
    let countQuery = db.select({ count: sql`count(*)::int` }).from(tickets);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const countResult = await countQuery;
    const totalItems = countResult[0].count;
    
    // Get paginated data
    let dataQuery = db.select().from(tickets);
    if (conditions.length > 0) {
      dataQuery = dataQuery.where(and(...conditions));
    }
    const data = await dataQuery.limit(parseInt(limit)).offset(offset);
    
    return {
      data,
      totalItems,
      page: parseInt(page),
      limit: parseInt(limit),
    };
  },

  findById: async function (id) {
    const result = await db.select().from(tickets).where(eq(tickets.id, id));
    return result[0];
  },

  create: async function (data) {
    const result = await db.insert(tickets).values(data).returning();
    return result[0];
  },
};

export default service;
