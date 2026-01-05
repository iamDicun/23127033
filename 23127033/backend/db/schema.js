import { pgEnum, pgTable, serial, timestamp, varchar, integer, text } from 'drizzle-orm/pg-core';

// Enums
export const ticketStatusEnum = pgEnum('ticket_status', ['open', 'in_progress', 'resolved', 'closed']);
export const ticketPriorityEnum = pgEnum('ticket_priority', ['low', 'medium', 'high']);

// Tables
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).unique(),
  phone: varchar('phone', { length: 20 }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const tickets = pgTable('tickets', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description').notNull(),
  status: ticketStatusEnum('status').notNull().default('open'),
  priority: ticketPriorityEnum('priority').notNull(),
  customerId: integer('customer_id')
    .notNull()
    .references(() => customers.id),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});
