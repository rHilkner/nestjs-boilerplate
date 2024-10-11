import { Inject, Injectable, Logger } from '@nestjs/common'
import { ApiSession } from '../api-session/api-session.model'
import { ApiExceptions } from '../../common/exceptions/api-exceptions'
import { ApiSessionService } from '../api-session/api-session.service'
import { UserService } from '../users/user.service'
import { REQUEST } from '@nestjs/core'
import { LoginDto } from './dtos/login.dto'
import { UserRole } from '../../../shared/enums'
import { compare } from '../../common/libs/encrypt.util'
import { SignUpDto } from './dtos/sign-up.dto'
import { RequestDetails } from '../../common/interfaces/request-details'

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @Inject(REQUEST) private readonly request: RequestDetails,
        private readonly apiSessionService: ApiSessionService,
        private readonly userService: UserService,
    ) {}

    /**
     * Authenticates a user and returns a new API session
     * @param email
     * @param password
     */
    async login({ email, password }: LoginDto): Promise<ApiSession> {
        let user = await this.userService.findByEmail(email);
        if (user == null) {
            throw ApiExceptions.UnauthorizedException(
                'Invalid credentials',
                `Invalid credentials for user [${email}]`
            );
        }
        this.logger.log(`Attempting to authenticate [${user.role} / ${user.email}] with password`);
        if (user.passwordHash == null || !await compare(password, user.passwordHash)) {
            throw ApiExceptions.UnauthorizedException(
                'Invalid credentials',
                `Invalid credentials for user [${user.email}]`
            );
        }
        user.lastAccessIp = this.request.ip;
        user = await this.userService.save(user)
        const apiSession = await this.apiSessionService.createAndSaveApiSession(user);
        apiSession.user = user;
        return apiSession;
    }

    async signUp({ email, password }: SignUpDto): Promise<ApiSession> {
        const user = await this.userService.findByEmail(email);
        if (user != null) {
            throw ApiExceptions.ConflictException(
                'User already exists',
                `User with email [${email}] already exists`
            );
        }
        const newUser = await this.userService.createUser(email, password, UserRole.CUSTOMER);
        const apiSession = await this.apiSessionService.createAndSaveApiSession(newUser);
        apiSession.user = newUser;
        return apiSession;
    }

    async signOut(): Promise<void> {
        const apiSession = this.request.apiSession;
        await this.apiSessionService.invalidateApiSession(apiSession);
    }

    async refreshTokens(): Promise<ApiSession> {
        const apiSession = this.request.apiSession;
        return await this.apiSessionService.refreshTokens(apiSession);
    }
}
