import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CallLogService } from '../../../call-log/call-log.service';
import { CallLog } from '../../../call-log/call-log.model';
import { uuid } from 'uuidv4';

@Injectable()
export class CallLogInterceptor implements NestInterceptor {
    constructor(private readonly callLogService: CallLogService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        // Create CallLog object
        const sysCallLog = new CallLog({
            id: uuid(),
            transactionId: request.transactionId,
            userId: request.user?.id,
            sessionId: request.apiSession?.id,
            url: request.url,
            ip: request.ip,
            method: request.method,
            endpoint: request.route.path,
            parameters: JSON.stringify(request.params),
            requestBody: JSON.stringify(request.body),
            requestHeaders: JSON.stringify(request.headers),
            currentUserId: request.user?.id,
        });

        // Save to DB
        const savedCallLog = await this.callLogService.create(sysCallLog);

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
                    this.callLogService.update(savedCallLog);
                }),
            );
    }
}
