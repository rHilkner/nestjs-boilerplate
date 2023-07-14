import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationInterceptor } from './shared/base/interceptors-n-filters/authentication.interceptor';
import { SysCallLogService } from './sys-call-log/sys-call-log.service';
import { UserService } from './users/user.service';
import { CallLogInterceptor } from './shared/base/interceptors-n-filters/call-log.interceptor';
import { ApiSessionService } from './api-session/api-session.service';
import { ExceptionHandlerFilter } from './shared/base/interceptors-n-filters/exception-handler-filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    const apiSessionService = app.get(ApiSessionService);
    const sysCallLogService = app.get(SysCallLogService);
    const userService = app.get(UserService);

    app.useGlobalInterceptors(
        new AuthenticationInterceptor(apiSessionService, userService),
        new CallLogInterceptor(sysCallLogService)
    );

    app.useGlobalFilters(
        new ExceptionHandlerFilter()
    )

    await app.listen(3000);
}

bootstrap();
