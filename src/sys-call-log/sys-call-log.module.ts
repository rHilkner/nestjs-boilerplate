import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysCallLog } from './sys-call-log.model';
import { SysCallLogService } from './sys-call-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysCallLog])],
  providers: [SysCallLogService],
})
export class SysCallLogModule {}
