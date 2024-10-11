import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/user.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { ErrorLogModule } from '../error-log/error-log.module';
import { CallLogModule } from '../call-log/call-log.module';
import { ApiSessionModule } from '../api-session/api-session.module';
import { PostgresModule } from '../../config/postgres.module';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '../http/http.module';

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
