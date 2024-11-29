import { users } from '@/app/db/schema'
import { db } from '@/lib/db'
import { zValidator } from '@hono/zod-validator'
import to from 'await-to-ts'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import z from "zod"

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

app.post('/auth/create', zValidator('json', z.object({
  username: z.string().min(3, { message: "lenth of username must be more than 3" })
})), async (c) => {
  const { username } = await c.req.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, userExist] = await to(db.select().from(users).where(eq(users.username, username)))
  if (userExist) {

    return c.json({ message: "user already exist" }, 403)
  }
  const [mutationError, user] = await to(
    db.insert(users).values({ username }).returning()
  );
  if (mutationError) {
    return c.json({ error: 'Database error' });
  }
  return c.json(user, 201);
});

export const GET = handle(app)
