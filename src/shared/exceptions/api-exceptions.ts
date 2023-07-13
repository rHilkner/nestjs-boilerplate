import { HttpException, HttpStatus } from '@nestjs/common';

class ApiException extends HttpException {
    errorCode: string;
    httpStatus: HttpStatus;
    appErrorMessage: string;
    errorMessage: string;
    debugMessage: string;
    timestamp: Date;

    constructor(props: {
        errorCode: string,
        httpStatus: HttpStatus,
        appErrorMessage: string,
        errorMessage: string,
        debugMessage: string,
    }) {
        super({
            errorCode: props.errorCode,
            httpStatus: props.httpStatus.valueOf(),
            errorMessage: props.errorMessage,
            appErrorMessage: props.appErrorMessage,
        }, props.httpStatus);
        this.errorCode = props.errorCode;
        this.httpStatus = props.httpStatus;
        this.appErrorMessage = props.appErrorMessage;
        this.errorMessage = props.errorMessage;
        this.debugMessage = props.debugMessage;
        this.timestamp = new Date();
    }
}

export const ApiExceptions = {
    UnexpectedErrorException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'INTERNAL_SERVER_ERROR',
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        appErrorMessage: 'Internal server error.',
        errorMessage,
        debugMessage,
    }),
    BadRequestException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'BAD_REQUEST',
        httpStatus: HttpStatus.BAD_REQUEST,
        appErrorMessage: 'Bad request.',
        errorMessage,
        debugMessage,
    }),
    ForbiddenException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'FORBIDDEN',
        httpStatus: HttpStatus.FORBIDDEN,
        appErrorMessage: 'Forbidden.',
        errorMessage,
        debugMessage,
    }),
    ServiceUnavailableException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'SERVICE_UNAVAILABLE',
        httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
        appErrorMessage: 'Service unavailable.',
        errorMessage,
        debugMessage,
    }),
    UnauthorizedException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'UNAUTHORIZED',
        httpStatus: HttpStatus.UNAUTHORIZED,
        appErrorMessage: 'Unauthorized.',
        errorMessage,
        debugMessage,
    }),
    ExternalServiceException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'EXTERNAL_SERVICE_ERROR',
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        appErrorMessage: 'External service error.',
        errorMessage,
        debugMessage,
    }),
    NotFoundException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'NOT_FOUND',
        httpStatus: HttpStatus.NOT_FOUND,
        appErrorMessage: 'Not found.',
        errorMessage,
        debugMessage,
    }),
    ConflictException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'CONFLICT',
        httpStatus: HttpStatus.CONFLICT,
        appErrorMessage: 'Conflict.',
        errorMessage,
        debugMessage,
    }),
    UnprocessableEntityException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'UNPROCESSABLE_ENTITY',
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
        appErrorMessage: 'Unprocessable entity.',
        errorMessage,
        debugMessage,
    }),
    InternalServerErrorException: (errorMessage: string, debugMessage: string) => new ApiException({
        errorCode: 'INTERNAL_SERVER_ERROR',
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        appErrorMessage: 'Internal server error.',
        errorMessage,
        debugMessage,
    }),
};
