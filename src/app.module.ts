import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysErrorLogModule } from './sys-error-log/sys-error-log.module';
import { SysCallLogModule } from './sys-call-log/sys-call-log.module';
import { ApiSessionModule } from './api-session/api-session.module';

@Module({
    imports: [
        ApiSessionModule,
        CurrenciesModule,
        SysErrorLogModule,
        SysCallLogModule,
        UserModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [],
            synchronize: true,
        })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
