import { HttpException, HttpStatus } from '@nestjs/common'

export class ApiException extends HttpException {
  public errorName: string;
  errorCode: string
  httpStatus: HttpStatus
  appErrorMessage: string
  errorMessage: string
  debugMessage: string
  stack: string
  timestamp: Date

  constructor(props: {
    errorName: string,
    errorCode: string,
    httpStatus: HttpStatus,
    appErrorMessage: string,
    errorMessage: string,
    debugMessage: string,
    stack?: string,
  }) {
    super({
      errorCode: props.errorCode,
      httpStatus: props.httpStatus.valueOf(),
      errorMessage: props.errorMessage,
      appErrorMessage: props.appErrorMessage,
    }, props.httpStatus)
    this.errorName = props.errorName
    this.errorCode = props.errorCode
    this.httpStatus = props.httpStatus
    this.appErrorMessage = props.appErrorMessage
    this.errorMessage = props.errorMessage
    this.debugMessage = props.debugMessage
    this.timestamp = new Date()
    if (props.stack) {
      this.stack = props.stack
    } else {
      Error.captureStackTrace(this, ApiException)
    }
  }

  public static fromAnyException(ex: unknown): ApiException {
    if (ex instanceof ApiException) {
      return ex;
    }

    if (ex instanceof Error) {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      return new ApiException({
        errorName: ex instanceof HttpException ? 'HttpException' : 'Error',
        errorCode: status.toString() ?? 'UNKNOWN ERROR',
        httpStatus: status,
        appErrorMessage: ex.name,
        errorMessage: ex.message,
        debugMessage: ex.message,
        stack: ex.stack ?? '',
      });
    }

    const unexpectedErrorMessage = 'Unexpected error occurred.';

    if (typeof ex === 'string') {
      return new ApiException({
        errorName: 'StringException',
        errorCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        appErrorMessage: unexpectedErrorMessage,
        errorMessage: ex,
        debugMessage: ex,
      });
    }

    if (typeof ex === 'object') {
      return new ApiException({
        errorName: 'ObjectException',
        errorCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        appErrorMessage: unexpectedErrorMessage,
        errorMessage: JSON.stringify(ex),
        debugMessage: JSON.stringify(ex),
      });
    }

    return new ApiException({
      errorName: 'UnhandledException',
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR.toString(),
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      appErrorMessage: unexpectedErrorMessage,
      errorMessage: unexpectedErrorMessage,
      debugMessage: unexpectedErrorMessage,
    });
  }
}
