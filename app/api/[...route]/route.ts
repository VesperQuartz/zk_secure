import { products, users } from "@/app/db/schema";
import { db } from "@/lib/db";
import { zValidator } from "@hono/zod-validator";
import to from "await-to-ts";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { handle } from "hono/vercel";
import z from "zod";
import { logger } from "hono/logger";
import argon2 from "@node-rs/argon2";
import {
  createSession,
  generateSessionToken,
  validateSessionToken,
} from "@/lib/lucia";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
app.use(logger());

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.post(
  "/auth/register",
  zValidator(
    "json",
    z.object({
      username: z
        .string()
        .min(3, { message: "length of username must be more than 3" }),
      password: z
        .string()
        .min(6, { message: "password length mut be more than 6" }),
    }),
  ),
  async (c) => {
    const { username, password } = c.req.valid("json");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, userExist] = await to(
      db.select().from(users).where(eq(users.username, username)),
    );

    if (userExist[0]) {
      return c.json({ message: "user already exist" }, 403);
    }

    const passwordHash = await argon2.hash(password);
    const [mutationError, user] = await to(
      db
        .insert(users)
        .values({ username, password: passwordHash, verified: 1 })
        .returning(),
    );
    if (mutationError) {
      return c.json({ error: "Database error" });
    }
    const token = generateSessionToken();
    const session = await createSession(token, user[0].id);
    setCookie(c, "session", token);
    return c.json({ ...session, token }, 201);
  },
);

app.post(
  "/auth/signin",
  zValidator(
    "json",
    z.object({
      username: z
        .string()
        .min(3, { message: "length of username must be more than 3" }),
      password: z
        .string()
        .min(6, { message: "password length mut be more than 6" }),
    }),
  ),
  async (c) => {
    const { username, password } = c.req.valid("json");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, userExist] = await to(
      db.select().from(users).where(eq(users.username, username)),
    );

    if (!userExist[0]) {
      return c.json({ message: "please signup" }, 404);
    }

    const verifyPassword = await argon2.verify(
      userExist[0].password!,
      password,
    );

    if (!verifyPassword) {
      return c.json({ message: "username or password incorrect" }, 403);
    }

    const token = generateSessionToken();
    const session = await createSession(token, userExist[0].id);
    setCookie(c, "session", token);
    return c.json({ ...session, token }, 201);
  },
);

app.post(
  "/products",
  zValidator(
    "json",
    z.object({
      title: z.string(),
      description: z.string(),
      price: z.coerce.number(),
      category: z.string(),
      fileUrl: z.string(),
    }),
  ),
  async (c) => {
    const { title, description, price, category, fileUrl } =
      c.req.valid("json");
    const token = getCookie(c, "session");
    if (token) {
      const { session } = await validateSessionToken(token!);
      await to(
        db.insert(products).values({
          title,
          description,
          price,
          category,
          fileUrl,
          sellerId: session!.userId,
        }),
      );
      return c.json({ message: "Product inserted successfully" }, 201);
    }
    return c.json(
      { message: "You are not authorized to perform this action" },
      401,
    );
  },
);

app.get("/products", async (c) => {
  const token = getCookie(c, "session");
  if (token) {
    const [pError, product] = await to(
      db
        .select({ users, products })
        .from(products)
        .innerJoin(users, eq(products.sellerId, users.id)),
    );
    if (pError) {
      return c.json([]);
    }
    return c.json(product);
  }
  return c.json(
    { message: "You are not authorized to perform this action" },
    401,
  );
});

app.get("/auth", async (c) => {
  const token = getCookie(c, "session");
  if (token) {
    const { session } = await validateSessionToken(token!);
    return c.json(session);
  }
  return c.json({ message: "You are not authorized" }, 401);
});

export const GET = handle(app);
export const POST = handle(app);
