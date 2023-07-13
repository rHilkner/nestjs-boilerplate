import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { ApiSessionService } from './api-session/api-session.service';

@Module({
  imports: [UsersModule, CurrenciesModule],
  controllers: [AppController],
  providers: [AppService, ApiSessionService],
})
export class AppModule {}
