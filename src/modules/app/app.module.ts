import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../users/user.module'
import { CurrenciesModule } from '../currencies/currencies.module'
import { ErrorLogModule } from '../error-log/error-log.module'
import { CallLogModule } from '../call-log/call-log.module'
import { ApiSessionModule } from '../api-session/api-session.module'
import { PostgresModule } from '../../config/postgres.module'
import { AuthModule } from '../auth/auth.module'
import { HttpModule } from '../http/http.module'
import { RequestIdMiddleware } from '../../base/interceptors/request-id.middleware'
import { AuthenticationInterceptor } from '../../base/interceptors/authentication.interceptor'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { CallLogInterceptor } from '../../base/interceptors/call-log.interceptor'
import { ExceptionHandlerFilter } from '../../base/interceptors/exception-handler-filter'

@Module({
  imports: [
    ApiSessionModule,
    AuthModule,
    CallLogModule,
    CurrenciesModule,
    ErrorLogModule,
    HttpModule,
    PostgresModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useClass: ExceptionHandlerFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: AuthenticationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: CallLogInterceptor,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes('*', '/')
  }
}
