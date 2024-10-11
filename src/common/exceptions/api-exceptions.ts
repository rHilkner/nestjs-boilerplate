import { HttpStatus } from '@nestjs/common'
import { ApiException } from './api-exception'

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
}
