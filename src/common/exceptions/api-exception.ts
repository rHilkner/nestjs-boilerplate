import { HttpException, HttpStatus } from '@nestjs/common'

export class ApiException extends HttpException {
  errorCode: string
  httpStatus: HttpStatus
  appErrorMessage: string
  errorMessage: string
  debugMessage: string
  stack: string
  timestamp: Date

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
    }, props.httpStatus)
    this.errorCode = props.errorCode
    this.httpStatus = props.httpStatus
    this.appErrorMessage = props.appErrorMessage
    this.errorMessage = props.errorMessage
    this.debugMessage = props.debugMessage
    this.timestamp = new Date()
  }

  static fromException(exception: any): ApiException {
    if (exception instanceof ApiException) {
      return exception
    }
    if (exception instanceof HttpException) {
      return new ApiException({
        errorCode: 'INTERNAL_SERVER_ERROR',
        httpStatus: exception.getStatus(),
        appErrorMessage: 'Internal server error.',
        errorMessage: exception.message ?? 'Internal server error.',
        debugMessage: exception.stack ?? '',
      })
    }
    return new ApiException({
      errorCode: 'INTERNAL_SERVER_ERROR',
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      appErrorMessage: 'Internal server error.',
      errorMessage: 'Internal server error.',
      debugMessage: '',
    })
  }
}
