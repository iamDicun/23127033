import db from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';

const services = {
    // Get all users
    getAllUsers: async () => {
        return await db.select().from(users);
    },

    // Get user by id
    getUserById: async (id) => {
        const result = await db.select({
            id: users.id,
            full_name: users.full_name,
            email: users.email,
            phone: users.phone,
            role: users.role,
        }).from(users).where(eq(users.id, id));
        return result[0]; // lệnh select sẽ trả về mảng json, ta mong đợi object nên cần làm vầy
    },

    updateUser: async (object) => {
        return await db.update(users).set(object).where(eq(object.id, users.id));
    },
    
     // Get user by id
    getUserByEmail: async (email) => {
        const result = await db.select({
            id: users.id,
            full_name: users.full_name,
            email: users.email,
            phone: users.phone,
            role: users.role,
        }).from(users).where(eq(users.email, email));

        // Khi code trả về mảng rỗng, dùng [0] sẽ trả về undefined
        return result[0]; // lệnh select sẽ trả về mảng json, ta mong đợi object nên cần làm vầy
    },

    createUser: async (object) => {
        const result = await db.insert(users).values(object).returning();

        return result[0];
    },

    loginUser: async (object) => {
        const result = await db.select().from(users).where(and(eq(users.email, object.email), eq(users.password_hash, object.password_hash)));
        return result[0];
    },

    removeUserById: async (id) => {
        await db.delete(users).where(eq(users.id, id));
    }
};

export default services;