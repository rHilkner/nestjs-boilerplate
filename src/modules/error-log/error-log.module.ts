import { Module } from '@nestjs/common'
import { ErrorLogService } from './error-log.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [ErrorLogService],
})
export class ErrorLogModule {
}
