import { Inject, Injectable } from '@nestjs/common'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CallType } from '../../common/enums/call-type'
import { CallLogService } from '../call-log/call-log.service'
import { RequestContext } from '../../common/types/request-context'
import { REQUEST } from '@nestjs/core'
import { MAIN_API } from '../../common/constants'
import { ulid } from 'ulid'

@Injectable()
export class HttpService {

  constructor(
    private readonly callLogService: CallLogService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
    const startTime = Date.now()
    const response = await axios.get(url, { timeout: 5000, ...options })
    await this.callLogService.save({
      id: ulid(),
      requestId: this.request.raw.requestId,
      userId: this.request.raw.jwtData?.userId ?? null,
      apiSessionId: this.request.raw.apiSession?.id ?? null,
      type: CallType.INCOMING,
      url: url,
      ip: this.request.ip,
      method: this.request.method,
      endpoint: this.request.url,
      parameters: JSON.stringify(this.request.params),
      requestBody: JSON.stringify(this.request.body),
      requestHeaders: JSON.stringify(this.request.headers),
      httpStatus: response.status,
      responseBody: JSON.stringify(response.data),
      responseHeaders: JSON.stringify(response.headers),
      startDt: new Date(startTime),
      endDt: new Date(),
      createdDt: new Date(),
      createdBy: this.request.raw.jwtData?.userId ?? MAIN_API,
      updatedDt: new Date(),
      updatedBy: this.request.raw.jwtData?.userId ?? MAIN_API,
    })
    return response
  }

}
