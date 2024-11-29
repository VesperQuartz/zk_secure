import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$default(() => crypto.randomUUID()),
  username: text('username'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});


export const listings = sqliteTable('listings', {
  id: text('id').primaryKey().$default(() => crypto.randomUUID()),
  sellerId: integer('seller_id').references(() => users.id),
  profileUrl: text('profile_url').notNull(),
  headline: text('headline'),
  connections: integer('connections'),
  accountAge: integer('account_age'),
  price: integer('price'),
  currency: text('currency').default('USD'),
  status: text('status').default('active'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect;
