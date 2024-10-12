import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { AuthorizationGuard } from './base/guards/authorization.guard'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { env_vars } from './base/env_vars'
import { ExceptionHandlerFilter } from './base/interceptors/exception-handler-filter'
import { ApiSessionInterceptor } from './base/interceptors/api-session.interceptor'
import { CallLogInterceptor } from './base/interceptors/call-log.interceptor'
import { ErrorLogService } from './modules/error-log/error-log.service'
import { UserService } from './modules/users/user.service'
import { ApiSessionService } from './modules/api-session/api-session.service'
import { CallLogService } from './modules/call-log/call-log.service'
import { AuthenticationInterceptor } from './base/interceptors/authentication.interceptor'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.enableCors()

  const apiSessionService = app.get(ApiSessionService);
  const sysCallLogService = app.get(CallLogService);
  const errorLogService = app.get(ErrorLogService);
  const userService = app.get(UserService);

  app.useGlobalGuards(new AuthorizationGuard(new Reflector()));
  app.useGlobalFilters(new ExceptionHandlerFilter(errorLogService));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(
    new ApiSessionInterceptor(apiSessionService, userService),
    new CallLogInterceptor(sysCallLogService),
    new AuthenticationInterceptor(),
  );


  app.useGlobalGuards(new AuthorizationGuard(new Reflector()))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const port = env_vars.PORT
  await app.listen(port, '0.0.0.0');
}

void bootstrap()
