import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../../users/user.service';
import { ApiSessionService } from '../../../api-session/api-session.service';
import { uuid } from 'uuidv4';

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
    constructor(
        private readonly apiSessionService: ApiSessionService,
        private readonly userService: UserService,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        // Extract the bearer token from the Authorization header
        const bearerToken = request.headers.authorization?.split(' ')[1];

        if (bearerToken) {
            // Validate the token and get the user
            const apiSession = await this.apiSessionService.getActiveApiSession(bearerToken);
            const user = await this.userService.getUserById(apiSession.userId);
            // Attach the user to the request object
            request.apiSession = apiSession;
            request.user = user;
            request.transactionId = uuid();
        }

        return next.handle();
    }
}
