import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { ApiException } from '../../common/exceptions/api-exception';
import { ErrorLogService } from '../../services/error-log/error-log.service';

@Catch()
export class ExceptionHandlerFilter extends BaseExceptionFilter {

    private readonly logger = new Logger(ExceptionHandlerFilter.name);

    constructor(
        private readonly errorLogService: ErrorLogService,
    ) {
        super();
    }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        type ErrorDto = {
            errorCode: string,
            httpStatus: number,
            appErrorMessage: string,
            errorMessage: string,
            timestamp: string,
        }

        const ex = ApiException.fromException(exception);
        const responseBody: ErrorDto = {
            errorCode: ex.errorCode,
            httpStatus: ex.httpStatus,
            appErrorMessage: ex.appErrorMessage,
            errorMessage: ex.errorMessage,
            timestamp: ex.timestamp.toISOString(),
        };

        this.errorLogService.saveException(exception)
            .catch(error => this.logger.error(error));

        response.status(status).json(responseBody);
    }
}
