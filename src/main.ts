import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationInterceptor } from './shared/base/interceptors-n-filters/authentication.interceptor';
import { CallLogService } from './call-log/call-log.service';
import { UserService } from './users/user.service';
import { CallLogInterceptor } from './shared/base/interceptors-n-filters/call-log.interceptor';
import { ApiSessionService } from './api-session/api-session.service';
import { ExceptionHandlerFilter } from './shared/base/interceptors-n-filters/exception-handler-filter';
import { RolesGuard } from './shared/base/roles.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const apiSessionService = app.get(ApiSessionService);
    const sysCallLogService = app.get(CallLogService);
    const userService = app.get(UserService);

    app.useGlobalGuards(new RolesGuard(new Reflector()));
    app.useGlobalFilters(new ExceptionHandlerFilter());
    app.useGlobalInterceptors(
        new AuthenticationInterceptor(apiSessionService, userService),
        new CallLogInterceptor(sysCallLogService)
    );

    await app.listen(9000);
}

bootstrap();
