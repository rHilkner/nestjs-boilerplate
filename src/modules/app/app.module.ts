import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';
import { ErrorLogModule } from './modules/error-log/error-log.module';
import { CallLogModule } from './modules/call-log/call-log.module';
import { ApiSessionModule } from './modules/api-session/api-session.module';
import { PostgresModule } from '../../config/postgres.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpModule } from './modules/http/http.module';

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
