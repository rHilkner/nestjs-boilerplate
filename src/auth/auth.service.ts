import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

    /**
     * Authenticates a user and returns a new API session
     * @param appUser
     * @param password
     * @param requestIp
     */
    async authenticate(appUser: User, password: string, requestIp?: string): Promise<ApiSession> {
        this.logger.log(`Attempting to authenticate [${appUser.role} / ${appUser.email}] with password`);
        if (appUser.passwordHash == null || !await this.comparePassword(password, appUser.passwordHash)) {
            throw ApiExceptions.UnauthorizedException(
                'Invalid credentials',
                `Invalid credentials for user [${appUser.email}]`
            );
        }
        appUser.lastAccessIp = requestIp;
        return await this.apiSessionService.createAndSaveApiSession(appUser);
    }
}
