import { z } from 'zod'
import { ApiExceptions } from '../common/exceptions/api-exceptions'
import { ConfigService } from '@nestjs/config'

const envSchema = z.object({
  PORT: z.number(),
  DB_URL: z.string(),
})

type EnvVars = z.infer<typeof envSchema>;

export let env_vars: EnvVars;

export function setEnvVars(configService: ConfigService) {
  const envVars: z.SafeParseReturnType<EnvVars, EnvVars> = envSchema.safeParse({
    PORT: Number(configService.get('PORT')),
    DB_URL: configService.get('DB_URL'),
  })

  if (!envVars.success) {
    console.error("Environment variable validation failed", envVars.error.format());
    throw ApiExceptions.InternalServerErrorException("Invalid environment variables", `Environment variable validation failed: ${envVars.error.message}`);
  }

  env_vars = envVars.data;
}


