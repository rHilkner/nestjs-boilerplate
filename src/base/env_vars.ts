import { z } from 'zod';

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_SCHEMA: z.string(),
});

export const env_vars = envSchema.parse(process.env);
