import { Inject, Injectable } from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorLog } from './error-log.model';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ErrorLogService {

    constructor(
        @InjectRepository(ErrorLog)
        private readonly errorLogRepository: Repository<ErrorLog>,
        @Inject(REQUEST) private readonly request: any,
    ) {}

    saveException(exception: ApiException) {
        const errorLog = new ErrorLog({
            userId: this.request.user?.id,
            callLogId: this.request.apiSession?.callLogId,
            httpStatus: exception.httpStatus,
            exceptionClass: exception.name,
            stackTrace: exception.stack,
            errorMessage: exception.errorMessage,
            debugMessage: exception.debugMessage,
            timestamp: exception.timestamp,
            currentUserId: this.request.user?.id,
        });
        return this.errorLogRepository.save(errorLog);
    }
}
