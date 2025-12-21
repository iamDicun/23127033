import db from '../db/index.js';
import { orders, orderItems, products } from '../db/schema.js';
import { eq, count } from 'drizzle-orm';

// Get all orders with pagination and optional order items
export const getAllOrders = async ({ page = 1, limit = 10, include_items = false }) => {
    const offset = (page - 1) * limit;
    
    // Get total count for pagination
    const totalCountResult = await db
        .select({ count: count() })
        .from(orders);
    
    const totalCount = totalCountResult[0]?.count || 0;
    
    // Get paginated orders
    const ordersList = await db
        .select()
        .from(orders)
        .limit(limit)
        .offset(offset)
        .orderBy(orders.create_at);
    
    // If include_items is true, fetch order items with product details for each order
    if (include_items === true || include_items === 'true') {
        const ordersWithItems = await Promise.all(
            ordersList.map(async (order) => {
                const items = await db
                    .select({
                        id: orderItems.id,
                        order_id: orderItems.order_id,
                        product_id: orderItems.product_id,
                        quantity: orderItems.quantity,
                        unit_price: orderItems.unit_price,
                        product_name: products.name,
                        product_description: products.description,
                        product_price: products.price,
                        product_stock: products.stock_quantity
                    })
                    .from(orderItems)
                    .leftJoin(products, eq(orderItems.product_id, products.id))
                    .where(eq(orderItems.order_id, order.id));
                
                return {
                    ...order,
                    items
                };
            })
        );
        
        return {
            data: ordersWithItems,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        };
    }
    
    return {
        data: ordersList,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: totalCount,
            totalPages: Math.ceil(totalCount / limit)
        }
    };
};

// Get order by ID with optional order items
export const getOrderById = async (id, include_items = false) => {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    const order = result[0];
    
    if (!order) {
        return null;
    }
    
    // If include_items is true, fetch order items with product details
    if (include_items === true || include_items === 'true') {
        const items = await db
            .select({
                id: orderItems.id,
                order_id: orderItems.order_id,
                product_id: orderItems.product_id,
                quantity: orderItems.quantity,
                unit_price: orderItems.unit_price,
                product_name: products.name,
                product_description: products.description,
                product_price: products.price,
                product_stock: products.stock_quantity
            })
            .from(orderItems)
            .leftJoin(products, eq(orderItems.product_id, products.id))
            .where(eq(orderItems.order_id, id));
        
        return {
            ...order,
            items
        };
    }
    
    return order;
};

// Create new order
export const createOrder = async (orderData) => {
    const result = await db.insert(orders).values(orderData).returning();
    return result[0];
};

// Update order by ID
export const updateOrder = async (id, orderData) => {
    const result = await db.update(orders).set(orderData).where(eq(orders.id, id)).returning();
    return result[0];
};

// Delete order by ID
export const deleteOrder = async (id) => {
    const result = await db.delete(orders).where(eq(orders.id, id)).returning();
    return result[0];
};
