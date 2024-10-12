import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { AuthorizationGuard } from './base/guards/authorization.guard'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { env_vars } from './base/env_vars'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.enableCors()

  app.useGlobalGuards(new AuthorizationGuard(new Reflector()))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const port = env_vars.PORT
  await app.listen(port, '0.0.0.0');
}

void bootstrap()
