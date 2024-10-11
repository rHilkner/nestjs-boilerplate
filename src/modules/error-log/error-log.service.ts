import { Inject, Injectable } from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorLog } from './error-log.model';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { RequestDetails } from '../../common/interfaces/request-details'

@Injectable()
export class ErrorLogService {

    constructor(
        @InjectRepository(ErrorLog)
        private readonly errorLogRepository: Repository<ErrorLog>,
        @Inject(REQUEST) private readonly request: RequestDetails,
    ) {}

    saveException(exception: ApiException) {
        const errorLog = new ErrorLog({
            userId: this.request.user?.id ?? '',
            transactionId: this.request.transactionId ?? '',
            httpStatus: exception.httpStatus,
            exceptionClass: exception.name,
            stackTrace: exception.stack,
            errorMessage: exception.errorMessage,
            debugMessage: exception.debugMessage,
            timestamp: exception.timestamp,
            currentUserId: this.request.user?.id ?? '',
        });
        return this.errorLogRepository.save(errorLog);
    }
}
