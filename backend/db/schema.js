import { 
  pgTable, 
  serial, 
  text, 
  varchar, 
  boolean, 
  timestamp, 
  integer, 
  decimal
} from 'drizzle-orm/pg-core';

export const chefs = pgTable('chefs', {
    chef_id: serial ('chef_id').primaryKey().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    specialty: varchar('specialty', { length: 256 }),
    bio: text('bio'),
    created_at: timestamp('created_at').defaultNow()
});

export const categories = pgTable('categories', {
  category_id: serial ('category_id').primaryKey().notNull(),
  name: varchar('name', { length: 101 }).notNull().unique(),
  created_at: timestamp('created_at').defaultNow()
})

export const dishes = pgTable('dishes', {
  dish_id: serial ('dish_id').primaryKey().notNull(),
  dish_name: varchar('dish_name', { length: 501 }).notNull(),
  description: text('description').notNull(),
  image_url: varchar('image_url', { length: 1001 }),
  chef_id: integer('chef_id').references(() => chefs.chef_id),
  category_id: integer('category_id').references(() => categories.category_id),
  rating: decimal ('rating', { precision: 2, scale: 1 }),
  total_reviews: integer('total_reviews').default(0),
  preparation_time_minutes: integer('preparation_time_minutes').notNull(),
  serving_size: integer('serving_size').notNull(),
  current_price: decimal ('current_price', { precision: 10, scale: 2 }).notNull(),
  original_price: decimal ('original_price', { precision: 10, scale: 2 }).notNull(),
  is_featured: boolean('is_featured').default(false),
  created_at: timestamp('created_at').defaultNow()
})