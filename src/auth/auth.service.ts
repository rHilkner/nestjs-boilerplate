import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ApiSession } from '../api-session/api-session.model';
import { ApiExceptions } from '../shared/exceptions/api-exceptions';
import { User } from '../users/user.model';
import { ApiSessionService } from '../api-session/api-session.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly shouldSessionExpire: boolean;
    private readonly sessionExpiresIn: number;

    constructor(
        private apiSessionService: ApiSessionService,
        private configService: ConfigService
    ) {
        this.shouldSessionExpire = this.configService.get<boolean>('app-env.authentication.should-session-expire');
        this.sessionExpiresIn = this.configService.get<number>('app-env.authentication.session-expires-in');
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

    // The authenticate() method is split into two methods because in NestJS,
    // request data is not directly passed to services. It's extracted in the controller
    // and then passed to the service methods.
    async authenticate(appUser: User, password: string, requestIp?: string): Promise<ApiSession> {
        this.logger.log(`Attempting to authenticate [${appUser.role} / ${appUser.email}] with password`);
        if (appUser.passwordHash == null || !await this.comparePassword(password, appUser.passwordHash)) {
            throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
        }
        appUser.lastAccessIp = requestIp;
        return await this.apiSessionService.createAndSaveApiSession(appUser);
    }

    authorize(userRole: string, userPermissions: string[], securedRoles: string[], securedPermissions: string[], endpoint: string) {
        this.logger.log(`Authorizing request for endpoint [${endpoint}]`);

        if (securedRoles.length === 0) {
            this.logger.log(`Endpoint [${endpoint}] is not secured - authorizing request`);
            return;
        }

        if (!userRole || !securedRoles.includes(userRole)) {
            this.logger.error(`No session roles authorized for endpoint [${endpoint}]`);
            throw ApiExceptions.ForbiddenException(
                "No session roles authorized for endpoint",
                `No session roles authorized for endpoint [${endpoint}]`
            );
        }

        if (securedPermissions.length > 0 && !securedPermissions.some(p => userPermissions.includes(p))) {
            this.logger.error(`No session permissions authorized for endpoint [${endpoint}]`);
            throw ApiExceptions.ForbiddenException(
                "No session permissions authorized for endpoint",
                `No session permissions authorized for endpoint [${endpoint}]`
            );
        }

        this.logger.log(`Session authorized for endpoint [${endpoint}]`);
    }
}
