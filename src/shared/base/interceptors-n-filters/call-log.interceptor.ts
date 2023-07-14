import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SysCallLogService } from '../../../sys-call-log/sys-call-log.service';
import { SysCallLog } from '../../../sys-call-log/sys-call-log.model';
import { uuid } from 'uuidv4';

@Injectable()
export class CallLogInterceptor implements NestInterceptor {
    constructor(private readonly sysCallLogService: SysCallLogService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        // Create SysCallLog object
        const sysCallLog = new SysCallLog({
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
        const savedSysCallLog = await this.sysCallLogService.create(sysCallLog);

        return next
            .handle()
            .pipe(
                tap((resData) => {
                    savedSysCallLog.update({
                        httpStatus: response.statusCode,
                        responseBody: JSON.stringify(resData),
                        responseHeaders: JSON.stringify(response.getHeaders()),
                        endDt: new Date(),
                        currentUserId: savedSysCallLog.userId,
                    });
                    this.sysCallLogService.update(savedSysCallLog);
                }),
            );
    }
}
