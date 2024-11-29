import { User } from "@/app/db/schema";
import to from "await-to-ts";
import ky from "ky"

export const createAccount = async ({ username }: { username: string }) => {
  const [error, user] = await to(
    ky.post("/api/auth/create", {
      json: { username }
    }).json<User>()
  );
  if (error) {
    throw error;
  }
  return user;
}
