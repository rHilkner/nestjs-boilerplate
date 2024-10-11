import { Inject, Injectable } from '@nestjs/common'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CallLog } from '../call-log/call-log.model';
import { CallType } from '../../common/enums/call-type';
import { CallLogService } from '../call-log/call-log.service';
import { RequestContext } from '../../common/interfaces/request-context'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class HttpService {

    constructor(
        private readonly callLogService: CallLogService,
        @Inject(REQUEST) private readonly request: RequestContext,
    ) {}

    async get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
        const response = await axios.get(url, { timeout: 5000, ...options });
        await this.callLogService.save(
            new CallLog({
                transactionId: this.request.transactionId,
                userId: this.request.user?.id,
                sessionId: this.request.apiSession?.id,
                type: CallType.INCOMING,
                url: url,
                ip: 'localhost',
                method: this.request.method,
                endpoint: this.request.route.path,
                parameters: JSON.stringify(this.request.params),
                requestBody: JSON.stringify(this.request.body),
                requestHeaders: JSON.stringify(this.request.headers),
                currentUserId: this.request.user?.id,
            }),
        );
        return response;
    }

}
