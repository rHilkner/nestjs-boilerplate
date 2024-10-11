import { z } from 'zod'

const envSchema = z.object({
  PORT: z.number(),
  DB_HOST: z.string(),
  DB_PORT: z.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_SCHEMA: z.string(),
})

type EnvVars = z.infer<typeof envSchema>;

export const env_vars: EnvVars = envSchema.parse(process.env)
