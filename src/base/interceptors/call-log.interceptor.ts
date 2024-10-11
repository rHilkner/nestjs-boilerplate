import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CallLogService } from '../../modules/call-log/call-log.service';
import { CallLog } from '../../modules/call-log/call-log.model';
import { CallType } from '../../common/enums/call-type';
import { RequestContext } from '../../common/types/request-context'

@Injectable()
export class CallLogInterceptor implements NestInterceptor {
    constructor(private readonly callLogService: CallLogService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request: RequestContext = context.switchToHttp().getRequest();
        const response: {
            statusCode: number;
            getHeaders: () => any;
        } = context.switchToHttp().getResponse();

        // Create CallLog object
        const sysCallLog = new CallLog({
            requestId: request.raw.requestId,
            userId: request.raw.jwtData?.id,
            sessionId: request.raw.apiSession?.id,
            type: CallType.INCOMING,
            url: request.url,
            ip: request.ip,
            method: request.method,
            endpoint: request.url,
            parameters: JSON.stringify(request.params),
            requestBody: JSON.stringify(request.body),
            requestHeaders: JSON.stringify(request.headers),
            currentUserId: request.raw.jwtData?.id,
        });

        // Save to DB
        const savedCallLog = await this.callLogService.save(sysCallLog);

        return next
            .handle()
            .pipe(
                tap((resData) => {
                    savedCallLog.update({
                        httpStatus: response.statusCode,
                        responseBody: JSON.stringify(resData),
                        responseHeaders: JSON.stringify(response.getHeaders()),
                        endDt: new Date(),
                        currentUserId: savedCallLog.userId,
                    });
                    void this.callLogService.save(savedCallLog);
                }),
            );
    }
}
