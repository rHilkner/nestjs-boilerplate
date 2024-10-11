import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ApiSessionInterceptor } from './base/interceptors/api-session.interceptor'
import { CallLogService } from './modules/call-log/call-log.service'
import { UserService } from './modules/users/user.service'
import { CallLogInterceptor } from './base/interceptors/call-log.interceptor'
import { ApiSessionService } from './modules/api-session/api-session.service'
import { ExceptionHandlerFilter } from './base/interceptors/exception-handler-filter'
import { AuthorizationGuard } from './base/guards/authorization.guard'
import { ErrorLogService } from './modules/error-log/error-log.service'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.enableCors()

  const apiSessionService = app.get(ApiSessionService)
  const sysCallLogService = app.get(CallLogService)
  const errorLogService = app.get(ErrorLogService)
  const userService = app.get(UserService)

  app.useGlobalGuards(new AuthorizationGuard(new Reflector()))
  app.useGlobalFilters(new ExceptionHandlerFilter(errorLogService))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalInterceptors(
    new ApiSessionInterceptor(apiSessionService, userService),
    new CallLogInterceptor(sysCallLogService),
  )

  await app.listen(9000)
}

void bootstrap()
