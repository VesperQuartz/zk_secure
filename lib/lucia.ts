import { Session, sessionTable, User, users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { addDays } from "date-fns";
import { db } from "./db";

export function generateSessionToken(): string {
  const byte = new Uint8Array(20);
  crypto.getRandomValues(byte);
  const token = encodeBase32LowerCaseNoPadding(byte);
  return token;
}

export async function createSession(
  token: string,
  userId: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: addDays(new Date(), 30),
  } as Session;
  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, session: sessionTable })
    .from(sessionTable)
    .innerJoin(users, eq(sessionTable.userId, users.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { session, user } = result[0];
  if (Date.now() > session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
    return { session: null, user: null };
  }
  if (Date.now() >= addDays(session.expiresAt, 15).getTime()) {
    session.expiresAt = addDays(new Date(), 30);
    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, sessionId));
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
