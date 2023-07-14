import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysErrorLog } from './sys-error-log.model';
import { SysErrorLogService } from './sys-error-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysErrorLog])],
  providers: [SysErrorLogService],
})
export class SysErrorLogModule {}
