import { Injectable } from '@nestjs/common';
import { CallLog } from './call-log.model';

@Injectable()
export class CallLogService {

    create(sysCallLog: CallLog) {
        // TODO: Save to DB
        return sysCallLog;

    }

    update(sysCallLog: CallLog): CallLog {
        return sysCallLog;
    }
}
