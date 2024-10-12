import { Module } from '@nestjs/common'
import { CallLogService } from './call-log.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [CallLogService],
  exports: [CallLogService],
})
export class CallLogModule {
}
