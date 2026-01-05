import { boolean, pgEnum, pgTable, serial, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

// Enums
export const priorityLevelEnum = pgEnum('priority_level', ['low', 'medium', 'high']);

// Tables
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 50 }).notNull(),
  completed: boolean('completed').notNull().default(false),
  priority: priorityLevelEnum('priority').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});
