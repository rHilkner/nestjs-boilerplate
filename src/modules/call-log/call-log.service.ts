import { Injectable } from '@nestjs/common';
import { CallLog } from './call-log.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CallLogService {

    constructor(
        @InjectRepository(CallLog) private readonly callLogRepository: Repository<CallLog>,
    ) {}

    save(sysCallLog: CallLog) {
        return this.callLogRepository.save(sysCallLog);
    }

}
