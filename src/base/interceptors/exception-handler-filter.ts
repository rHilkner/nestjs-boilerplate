import { ArgumentsHost, Catch, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ApiException } from '../../common/exceptions/api-exception'
import { ErrorLogService } from '../../modules/error-log/error-log.service'
import { FastifyReply } from 'fastify'
import { ErrorDto } from '../../../shared/dtos'

@Catch()
export class ExceptionHandlerFilter extends BaseExceptionFilter {

  private readonly logger = new Logger(ExceptionHandlerFilter.name)

  constructor(
    private readonly errorLogService: ErrorLogService,
  ) {
    super()
  }

  public override catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<FastifyReply>();

    const apiException = ApiException.fromAnyException(exception);

    // override function cannot be async, error handling done async
    this.errorLogService.saveException(apiException)
      .catch(error => this.logger.error(error))

    const errorDto: ErrorDto = {
      errorCode: apiException.errorCode,
      httpStatus: apiException.httpStatus,
      errorMessage: apiException.errorMessage,
      appErrorMessage: apiException.appErrorMessage,
      timestamp: apiException.timestamp.toISOString(),
    };

    response.status(apiException.httpStatus).send(errorDto)
  }
}
