import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { ApiException } from '../api-exception';

@Catch(ApiException, HttpException)
export class ExceptionHandlerFilter extends BaseExceptionFilter {
    catch(exception: ApiException | HttpException, host: ArgumentsHost) {
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

        let responseBody: ErrorDto;

        if (exception instanceof ApiException) {
            responseBody = {
                errorCode: exception.errorCode,
                httpStatus: exception.httpStatus,
                appErrorMessage: exception.appErrorMessage,
                errorMessage: exception.errorMessage,
                timestamp: exception.timestamp.toISOString(),
            };
        } else if (exception instanceof HttpException) {
            responseBody = {
                errorCode: 'INTERNAL_SERVER_ERROR',
                httpStatus: status,
                appErrorMessage: 'Internal server error.',
                errorMessage: exception.message,
                timestamp: new Date().toISOString(),
            };
        } else {
            responseBody = {
                errorCode: 'INTERNAL_SERVER_ERROR',
                httpStatus: 500,
                appErrorMessage: 'Internal server error.',
                errorMessage: 'Internal server error.',
                timestamp: new Date().toISOString(),
            };
        }

        response.status(status).json(responseBody);
    }
}
