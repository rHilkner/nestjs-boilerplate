import { Injectable } from '@nestjs/common';
import { SysCallLog } from './sys-call-log.model';

@Injectable()
export class SysCallLogService {

    create(sysCallLog: SysCallLog) {
        // TODO: Save to DB
        return sysCallLog;

    }

    update(sysCallLog: SysCallLog): SysCallLog {
        return sysCallLog;
    }
}
