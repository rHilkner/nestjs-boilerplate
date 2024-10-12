import { Inject, Injectable } from '@nestjs/common'
import { ApiException } from '../../common/exceptions/api-exception'
import { REQUEST } from '@nestjs/core'
import { RequestContext } from '../../common/types/request-context'
import { PrismaService } from '../prisma/prisma.service'
import { ulid } from 'ulid'

@Injectable()
export class ErrorLogService {

  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request?: RequestContext,
  ) {}

  saveException(exception: ApiException) {
    return this.prisma.errorLogModel.create({
      data: {
        id: ulid(),
        userId: this.request?.raw.jwtData?.userId ?? '',
        callLogId: this.request?.raw.requestId ?? '',
        requestId: this.request?.raw.requestId ?? '',
        httpStatus: exception.httpStatus,
        exceptionClass: exception.name,
        stackTrace: exception.stack,
        errorMessage: exception.errorMessage,
        debugMessage: exception.debugMessage,
        timestamp: exception.timestamp,
        createdBy: this.request?.raw.jwtData?.userId ?? '',
        updatedBy: this.request?.raw.jwtData?.userId ?? '',
      },
    })
  }
}
