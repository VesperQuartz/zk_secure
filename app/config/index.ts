import z from "zod";
const envSchema = z.object({
  APP_ID: z.string(),
  SCHEMA_ID: z.string(),
});

const env = {
  SCHEMA_ID: process.env.NEXT_PUBLIC_SCHEMA_ID,
};

export const config = envSchema.parse(env);
