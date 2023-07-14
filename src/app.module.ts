import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './services/users/user.module';
import { CurrenciesModule } from './services/currencies/currencies.module';
import { ErrorLogModule } from './services/error-log/error-log.module';
import { CallLogModule } from './services/call-log/call-log.module';
import { ApiSessionModule } from './services/api-session/api-session.module';
import { PostgresModule } from './providers/postgres.module';
import { AuthModule } from './services/auth/auth.module';
import { HttpModule } from './services/http/http.module';

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
    providers: [AppService],
})
export class AppModule {}
