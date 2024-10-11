import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CallLog } from './call-log.model'
import { CallLogService } from './call-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([CallLog])],
  providers: [CallLogService],
  exports: [CallLogService],
})
export class CallLogModule {
}
