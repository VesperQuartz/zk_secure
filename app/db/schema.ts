import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  username: text("username"),
  password: text("password"),
  verified: integer("verified").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const products = sqliteTable("products", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  sellerId: text("seller_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  fileUrl: text("file_url").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const reviews = sqliteTable("reviews", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  productId: text("product_id")
    .references(() => products.id)
    .notNull(), // Foreign key to products table
  rating: integer("rating").notNull(), // Rating value (1-5)
  comment: text("comment").notNull(), // Comment on the product
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`), // Timestamp for review creation
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", {
    mode: "timestamp",
  }).notNull(),
});

export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Session = typeof sessionTable.$inferSelect;
