import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationInterceptor } from './base/interceptors-n-filters/authentication.interceptor';
import { CallLogService } from './services/call-log/call-log.service';
import { UserService } from './services/users/user.service';
import { CallLogInterceptor } from './base/interceptors-n-filters/call-log.interceptor';
import { ApiSessionService } from './services/api-session/api-session.service';
import { ExceptionHandlerFilter } from './base/interceptors-n-filters/exception-handler-filter';
import { RolesGuard } from './base/guards/roles.guard';
import { ErrorLogService } from './services/error-log/error-log.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const apiSessionService = app.get(ApiSessionService);
    const sysCallLogService = app.get(CallLogService);
    const errorLogService = app.get(ErrorLogService);
    const userService = app.get(UserService);

    app.useGlobalGuards(new RolesGuard(new Reflector()));
    app.useGlobalFilters(new ExceptionHandlerFilter(errorLogService));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalInterceptors(
        new AuthenticationInterceptor(apiSessionService, userService),
        new CallLogInterceptor(sysCallLogService)
    );

    await app.listen(9000);
}

bootstrap();
