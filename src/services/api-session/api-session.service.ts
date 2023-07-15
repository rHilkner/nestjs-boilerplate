import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiSession } from './api-session.model';
import { User } from '../users/user.model';
import { ApiExceptions } from '../../common/exceptions/api-exceptions';
import { Repository } from 'typeorm';

@Injectable()
export class ApiSessionService {

    private readonly logger = new Logger(ApiSessionService.name);
    private readonly sessionTokenLength = 72;
    private readonly sessionExpiration = 60 * 60 * 24 * 30; // 30 days

    constructor(
        @InjectRepository(ApiSession)
        private apiSessionRepository: Repository<ApiSession>,
    ) {}

    generateNewSessionToken(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        let counter = 0;
        while (counter < this.sessionTokenLength) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
            counter += 1;
        }
        return result;
    }

    async createAndSaveApiSession(user: User): Promise<ApiSession> {
        this.logger.debug(`Creating new API session for user: ${user.email}`);
        const newApiSession = new ApiSession({
            userId: user.id,
            token: this.generateNewSessionToken(),
            ipAddress: user.lastAccessIp,
        });
        return await this.apiSessionRepository.save(newApiSession);
    }

    async getActiveApiSession(token: string): Promise<ApiSession> {
        const apiSession = await this.apiSessionRepository.findOne({ where: { token } });
        if (!apiSession) {
            this.logger.error(`Invalid authorization token: ${token}`);
            throw ApiExceptions.BadRequestException(
                'Invalid authorization token',
                `Invalid authorization token ${token}`
            );
        } else if (apiSession.startDt.getTime() + this.sessionExpiration * 1000 < new Date().getTime()) {
            this.logger.error(`Authorization token revoked: ${token}`);
            throw ApiExceptions.BadRequestException(
                'Authorization token revoked',
                `Authorization token revoked ${token}`
            );
        }
        apiSession.lastActivityDt = new Date();
        return await this.apiSessionRepository.save(apiSession);
    }

    async invalidateApiSession(apiSession: ApiSession) {
        apiSession.active = false;
        await this.apiSessionRepository.save(apiSession);
    }
}
