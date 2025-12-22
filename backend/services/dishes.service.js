import db from '../db/index.js';
import { dishes } from '../db/schema.js';
import { eq, and, count } from 'drizzle-orm';

const services = {
    // Get all users
    createChef: async (dishData) => {
        const result = await db.insert(dishes).values(dishData).returning();
        return result[0];
    },

    getDish: async ({ chef_id, category_id, page, limit = 9}) => {
        const offset = (page - 1) * limit;
        
        // Build where conditions
        const conditions = [];
        
        if (chef_id) {
            conditions.push(eq(dishes.chef_id, chef_id));
        }

        if (category_id) {
            conditions.push(eq(dishes.category_id, category_id));
        }
        
        // Get total count for pagination
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
        
        const totalCountResult = await db
            .select({ count: count() })
            .from(dishes)
            .where(whereClause);
        
        const totalCount = totalCountResult[0]?.count || 0;
        
        // Get paginated products
        const result = await db
            .select()
            .from(dishes)
            .where(whereClause)
            .limit(limit)
            .offset(offset);
        
        const is_naviagte_next = parseInt(page) < Math.ceil(totalCount / limit);
        const is_navigate_prev = parseInt(page) > 1;

        return {
            data: result,
            metadata: {
                current_page: parseInt(page),
                total_pages: Math.ceil(totalCount / limit),
                total_dishes: totalCount,
                can_navigate_next: is_naviagte_next,
                can_navigate_prev: is_navigate_prev,
                from_offset: offset,
                to_offset: offset + 9 - 1
            }
        };
    }
};

export default services;