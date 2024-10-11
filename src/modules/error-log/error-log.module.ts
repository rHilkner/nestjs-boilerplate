import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ErrorLog } from './error-log.model'
import { ErrorLogService } from './error-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([ErrorLog])],
  providers: [ErrorLogService],
})
export class ErrorLogModule {
}
