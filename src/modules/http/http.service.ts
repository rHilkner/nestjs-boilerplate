import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CallLog } from '../call-log/call-log.model';
import { CallType } from '../../common/enums/call-type';
import { CallLogService } from '../call-log/call-log.service';

@Injectable()
export class HttpService {

    constructor(
        private readonly callLogService: CallLogService,
    ) {}

    async get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
        const response = await axios.get(url, { timeout: 5000, ...options });
        const request = response.request;
        await this.callLogService.save(
            new CallLog({
                transactionId: request.transactionId,
                userId: request.user?.id,
                sessionId: request.apiSession?.id,
                type: CallType.INCOMING,
                url: url,
                ip: 'localhost',
                method: request.method,
                endpoint: request.route.path,
                parameters: JSON.stringify(request.params),
                requestBody: JSON.stringify(request.body),
                requestHeaders: JSON.stringify(request.headers),
                currentUserId: request.user?.id,
            }),
        );
        return response;
    }

}
