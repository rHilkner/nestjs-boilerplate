import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { ApiSessionService } from './api-session/api-session.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        UserModule,
        CurrenciesModule,
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
    providers: [AppService, ApiSessionService],
})
export class AppModule {}
