import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CallLogService } from '../../modules/call-log/call-log.service'
import { CallType } from '../../common/enums/call-type'
import { RequestContext } from '../../common/types/request-context'
import { MAIN_API } from '../../common/constants'
import { ulid } from 'ulid'

@Injectable()
export class CallLogInterceptor implements NestInterceptor {
  constructor(private readonly callLogService: CallLogService) {
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request: RequestContext = context.switchToHttp().getRequest()
    const response: {
      statusCode: number;
      getHeaders: () => any;
    } = context.switchToHttp().getResponse()

    // Create CallLog object
    const savedCallLog = await this.callLogService.save({
      id: ulid(),
      requestId: request.raw.requestId,
      userId: request.raw.jwtData?.userId ?? null,
      apiSessionId: request.raw.apiSession?.id ?? null,
      type: CallType.INCOMING,
      url: request.url,
      ip: request.ip,
      method: request.method,
      endpoint: request.url,
      parameters: JSON.stringify(request.params),
      requestBody: JSON.stringify(request.body),
      requestHeaders: JSON.stringify(request.headers),
      createdBy: request.raw.jwtData?.userId ?? MAIN_API,
      updatedBy: request.raw.jwtData?.userId ?? MAIN_API,
      updatedDt: new Date(),
      createdDt: new Date(),
      httpStatus: response.statusCode,
      responseBody: null,
      responseHeaders: null,
      startDt: new Date(),
      endDt: null,
    })

    return next
      .handle()
      .pipe(
        tap((resData) => {
          savedCallLog.httpStatus = response.statusCode
          savedCallLog.responseBody = JSON.stringify(resData)
          savedCallLog.responseHeaders = JSON.stringify(response.getHeaders())
          savedCallLog.endDt = new Date()

          void this.callLogService.save(savedCallLog)
        }),
      )
  }
}
