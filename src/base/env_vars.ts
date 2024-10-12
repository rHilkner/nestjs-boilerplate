import { z } from 'zod'

const envSchema = z.object({
  PORT: z.number(),
  DB_URL: z.string(),
})

type EnvVars = z.infer<typeof envSchema>;

// export const env_vars: EnvVars = envSchema.parse(process.env)
export const env_vars: EnvVars = {
  PORT: 3000,
  DB_URL: 'mongodb://localhost:27017/test',
}
