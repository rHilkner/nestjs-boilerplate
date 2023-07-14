import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionHandlerFilter } from './shared/base/exception-handler/exception-handler-filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionHandlerFilter());
    await app.listen(3000);
}

bootstrap();
