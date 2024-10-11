import { Module } from '@nestjs/common'
import { CurrenciesController } from './currencies.controller'
import { CurrenciesService } from './currencies.service'
import { HttpModule } from '../http/http.module'
import { CallLogModule } from '../call-log/call-log.module'

@Module({
  imports: [
    CallLogModule,
    HttpModule,
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {
}
