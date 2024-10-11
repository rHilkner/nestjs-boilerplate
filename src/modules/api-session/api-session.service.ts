import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiSession } from './api-session.model';
import { User } from '../users/user.model';
import { ApiExceptions } from '../../common/exceptions/api-exceptions';
import { Repository } from 'typeorm';
import { generateRandomString } from '../../common/libs/encrypt.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiSessionService {

    private readonly logger = new Logger(ApiSessionService.name);
    private readonly sessionTokenLength = this.configService.get<number>('SESSION_TOKEN_LENGTH') ?? 32;
    private readonly accessTokenExpirationSeconds = this.configService.get<number>('ACCESS_TOKEN_EXPIRATION_SECONDS') ?? 3600;
    private readonly refreshTokenExpirationSeconds = this.configService.get<number>('REFRESH_TOKEN_EXPIRATION_SECONDS') ?? 86400;

    constructor(
        @InjectRepository(ApiSession)
        private apiSessionRepository: Repository<ApiSession>,
        private readonly configService: ConfigService,
    ) {}

    async createAndSaveApiSession(user: User): Promise<ApiSession> {
        this.logger.debug(`Creating new API session for user: ${user.email}`);
        const currentDtMillis = new Date().getTime();
        const newApiSession = new ApiSession({
            userId: user.id,
            accessToken: this.generateNewSessionToken(),
            refreshToken: this.generateNewSessionToken(),
            ipAddress: user.lastAccessIp,
            accessTokenExpDt: new Date(currentDtMillis + this.accessTokenExpirationSeconds * 1000),
            refreshTokenExpDt: new Date(currentDtMillis + this.refreshTokenExpirationSeconds * 1000),
        });
        return await this.apiSessionRepository.save(newApiSession);
    }

    async getActiveApiSession(accessToken: string): Promise<ApiSession> {
        const apiSession = await this.apiSessionRepository.findOne({ where: { accessToken } });
        if (!apiSession) {
            this.logger.error(`Invalid authorization token: ${accessToken}`);
            throw ApiExceptions.BadRequestException(
                'Invalid authorization token',
                `Invalid authorization token ${accessToken}`
            );
        } else if (apiSession.startDt.getTime() + this.accessTokenExpirationSeconds * 1000 < new Date().getTime()) {
            this.logger.error(`Authorization token revoked: ${accessToken}`);
            throw ApiExceptions.BadRequestException(
                'Authorization token revoked',
                `Authorization token revoked ${accessToken}`
            );
        }
        apiSession.lastActivityDt = new Date();
        return await this.apiSessionRepository.save(apiSession);
    }

    /**
     * Refreshes the access and refresh tokens for the given API session
     * @param apiSession
     */
    async refreshTokens(apiSession: ApiSession): Promise<ApiSession> {
        const currentDate = new Date();
        apiSession.accessToken = this.generateNewSessionToken();
        apiSession.refreshToken = this.generateNewSessionToken();
        apiSession.accessTokenExpDt = new Date(currentDate.getTime() + this.accessTokenExpirationSeconds * 1000);
        apiSession.refreshTokenExpDt = new Date(currentDate.getTime() + this.refreshTokenExpirationSeconds * 1000);
        apiSession.lastActivityDt = currentDate;
        return await this.apiSessionRepository.save(apiSession);
    }

    async invalidateApiSession(apiSession: ApiSession) {
        apiSession.active = false;
        await this.apiSessionRepository.save(apiSession);
    }

    private generateNewSessionToken(): string {
        return generateRandomString(this.sessionTokenLength);
    }
}
