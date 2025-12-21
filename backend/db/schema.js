import { desc } from 'drizzle-orm';
import { time } from 'drizzle-orm/mysql-core';
import { 
  pgTable, 
  serial, 
  text, 
  varchar, 
  boolean, 
  timestamp, 
  integer, 
  decimal, 
  pgEnum, 
  json, 
  date,
  index,
  numeric
} from 'drizzle-orm/pg-core';
import { id } from 'zod/v4/locales';

// 1. ENUMS: Định nghĩa các giá trị cố định (Rất phổ biến trong Postgres)
export const roleEnum = pgEnum('role', ['admin', 'customer', 'staff']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled']);

export const users = pgTable('users', {
    id: serial ('id').primaryKey().notNull(),
    full_name: text('full_name').notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    password_hash: text('password_hash').notNull(),
    phone: varchar('phone', { length: 20 }),
    role: roleEnum('role').notNull().default('customer'),
    is_active: boolean('is_active').default(true),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});

export const addresses = pgTable('addresses', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => users.id),
    street: text('street').notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    postal_code: varchar('postal_code', { length: 20 }),
    is_default: boolean('is_default').notNull().default(false),
});

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: numeric ('price', { precision: 10, scale: 2 }).notNull(),
    stock_quantity: integer('stock_quantity').notNull().default(0),
    attributes: json('attributes'), // Lưu trữ các thuộc tính động dưới dạng JSON
    is_published: boolean('is_published').notNull().default(true),
});

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => users.id),
    shipping_address_snapshot: json('shipping_address_snapshot').notNull(), // Lưu trữ snapshot địa chỉ giao hàng
    total_amount: numeric('total_amount', { precision: 12, scale: 2 }).notNull(),
    status: orderStatusEnum('status').notNull().default('pending'),
    expected_delivery_date: date('expected_delivery_date'),
    create_at: timestamp('created_at').notNull().defaultNow(),
});

export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => orders.id),
    product_id: integer('product_id').notNull().references(() => products.id),
    quantity: integer('quantity').notNull(),
    unit_price: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
});

/*export const orders = pgTable('orders', {
  id: integer('id').primaryKey(),
  recipient: varchar('recipient', { length: 256 }).notNull(),
  houseNumber: varchar('house_number', { length: 256 }).notNull(),
  street: varchar('street', { length: 256 }).notNull(),
  provinceId: integer('province_id').notNull(),
  wardId: integer('ward_id').notNull(),
});

export const wards = pgTable('wards', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  nameWithType: varchar('name_with_type', { length: 256 }).notNull(),
  provinceId: integer('province_id').notNull(),
});

export const provinces = pgTable('provinces', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  nameWithType: varchar('name_with_type', { length: 256 }).notNull(),
});*/