import { Inject, Injectable } from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorLog } from './error-log.model';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from '../../common/types/request-context'

@Injectable()
export class ErrorLogService {

    constructor(
        @InjectRepository(ErrorLog)
        private readonly errorLogRepository: Repository<ErrorLog>,
        @Inject(REQUEST) private readonly request?: RequestContext,
    ) {}

    saveException(exception: ApiException) {
        const errorLog = new ErrorLog({
            userId: this.request?.user?.id ?? '',
            requestId: this.request?.requestId ?? '',
            httpStatus: exception.httpStatus,
            exceptionClass: exception.name,
            stackTrace: exception.stack,
            errorMessage: exception.errorMessage,
            debugMessage: exception.debugMessage,
            timestamp: exception.timestamp,
            currentUserId: this.request?.user?.id ?? '',
        });
        return this.errorLogRepository.save(errorLog);
    }
}
