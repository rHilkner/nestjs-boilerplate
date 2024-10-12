import { Inject, Injectable } from '@nestjs/common'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CallLog } from '../call-log/call-log.model'
import { CallType } from '../../common/enums/call-type'
import { CallLogService } from '../call-log/call-log.service'
import { RequestContext } from '../../common/types/request-context'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class HttpService {

  constructor(
    private readonly callLogService: CallLogService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {
  }

  async get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
    const response = await axios.get(url, { timeout: 5000, ...options })
    await this.callLogService.save(
      new CallLog({
        requestId: this.request.raw.requestId,
        userId: this.request.raw.jwtData?.userId,
        sessionId: this.request.raw.apiSession?.id,
        type: CallType.INCOMING,
        url: url,
        ip: 'localhost',
        method: this.request.method,
        endpoint: this.request.url,
        parameters: JSON.stringify(this.request.params),
        requestBody: JSON.stringify(this.request.body),
        requestHeaders: JSON.stringify(this.request.headers),
        currentUserId: this.request.raw.jwtData?.userId,
      }),
    )
    return response
  }

}
