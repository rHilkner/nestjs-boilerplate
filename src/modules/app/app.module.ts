import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../users/user.module'
import { CurrenciesModule } from '../currencies/currencies.module'
import { ErrorLogModule } from '../error-log/error-log.module'
import { CallLogModule } from '../call-log/call-log.module'
import { ApiSessionModule } from '../api-session/api-session.module'
import { AuthModule } from '../auth/auth.module'
import { HttpModule } from '../http/http.module'
import { RequestIdMiddleware } from '../../base/interceptors/request-id.middleware'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ErrorLogModule,
    ApiSessionModule,
    AuthModule,
    CallLogModule,
    CurrenciesModule,
    HttpModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes('*', '/')
  }
}
