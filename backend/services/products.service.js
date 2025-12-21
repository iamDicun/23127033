import db from '../db/index.js';
import { products } from '../db/schema.js';
import { eq, and, gte, lte, ilike, asc, desc, sql, count } from 'drizzle-orm';

// Get all products with pagination, filtering, and sorting
export const getAllProducts = async ({ page = 1, limit = 10, keyword = '', minPrice, maxPrice, sortBy = 'id', order = 'asc' }) => {
    const offset = (page - 1) * limit;
    
    // Build where conditions
    const conditions = [];
    
    if (keyword) {
        conditions.push(ilike(products.name, `%${keyword}%`));
    }
    
    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
        conditions.push(gte(products.price, minPrice.toString()));
    }
    
    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
        conditions.push(lte(products.price, maxPrice.toString()));
    }
    
    // Build order by
    const orderColumn = sortBy === 'price' ? products.price : products.id;
    const orderDirection = order === 'desc' ? desc(orderColumn) : asc(orderColumn);
    
    // Get total count for pagination
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    const totalCountResult = await db
        .select({ count: count() })
        .from(products)
        .where(whereClause);
    
    const totalCount = totalCountResult[0]?.count || 0;
    
    // Get paginated products
    const result = await db
        .select()
        .from(products)
        .where(whereClause)
        .orderBy(orderDirection)
        .limit(limit)
        .offset(offset);
    
    return {
        data: result,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: totalCount,
            totalPages: Math.ceil(totalCount / limit)
        }
    };
};

// Get product by ID
export const getProductById = async (id) => {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
};

// Create new product
export const createProduct = async (productData) => {
    const result = await db.insert(products).values(productData).returning();
    return result[0];
};

// Update product by ID
export const updateProduct = async (id, productData) => {
    const result = await db.update(products).set(productData).where(eq(products.id, id)).returning();
    return result[0];
};

// Delete product by ID
export const deleteProduct = async (id) => {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result[0];
};
