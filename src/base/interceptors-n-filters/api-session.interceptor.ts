import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserService } from '../../modules/users/user.service'
import { ApiSessionService } from '../../modules/api-session/api-session.service'
import { uuid } from 'uuidv4'
import { RequestContext } from '../../common/types/request-context'

@Injectable()
export class ApiSessionInterceptor implements NestInterceptor {
    constructor(
        private readonly apiSessionService: ApiSessionService,
        private readonly userService: UserService,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest<RequestContext>();

        const bearerToken = request.headers.authorization?.split(' ')[1];

        if (bearerToken) {
            request.transactionId = uuid();
            const apiSession = await this.apiSessionService.getActiveApiSession(bearerToken);
            request.apiSession = apiSession;
            const user = await this.userService.getUserById(apiSession.userId);
            if (user) {
                request.user = user
            }
        }

        return next.handle();
    }
}
