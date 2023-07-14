import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiSession } from '../api-session/api-session.model';
import { ApiExceptions } from '../../common/exceptions/api-exceptions';
import { ApiSessionService } from '../api-session/api-session.service';
import bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { UserRole } from '../../common/enums/UserRole';
import { REQUEST } from '@nestjs/core';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly shouldSessionExpire: boolean;
    private readonly sessionExpiresIn: number;

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(REQUEST) private readonly request: any,
        private readonly apiSessionService: ApiSessionService,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        this.shouldSessionExpire = this.configService.get<boolean>('app-env.auth.should-session-expire');
        this.sessionExpiresIn = this.configService.get<number>('app-env.auth.session-expires-in');
    }

    /**
     * Authenticates a user and returns a new API session
     * @param email
     * @param password
     */
    async login({ email, password }: LoginDto): Promise<ApiSession> {
        let user = await this.userService.findByEmail(email);
        this.logger.log(`Attempting to authenticate [${user.role} / ${user.email}] with password`);
        if (user.passwordHash == null || !await this.comparePassword(password, user.passwordHash)) {
            throw ApiExceptions.UnauthorizedException(
                'Invalid credentials',
                `Invalid credentials for user [${user.email}]`
            );
        }
        user.lastAccessIp = this.request.ip;
        user = await this.userRepository.save(user)
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
        const apiSession = await this.request.apiSession;
        await this.apiSessionService.invalidateApiSession(apiSession);
    }

    async encodePassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    private async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}
