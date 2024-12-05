import z from "zod";
const envSchema = z.object({
  APP_ID: z.string(),
});

const env = {
  APP_ID: process.env.NEXT_PUBLIC_APP_ID,
};

export const config = envSchema.parse(env);
