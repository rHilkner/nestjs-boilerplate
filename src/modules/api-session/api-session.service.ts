import { Inject, Injectable, Logger } from '@nestjs/common'
import { ApiExceptions } from '../../common/exceptions/api-exceptions'
import { generateRandomString } from '../../common/libs/encrypt.util'
import { ApiSessionModel, AppUserModel } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { RequestContext } from '../../common/types/request-context'
import { REQUEST } from '@nestjs/core'
import { ulid } from 'ulid'

@Injectable()
export class ApiSessionService {

  private readonly logger = new Logger(ApiSessionService.name)
  private readonly sessionTokenLength = 32
  private readonly accessTokenExpirationSeconds = 3600
  private readonly refreshTokenExpirationSeconds = 86400

  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async createAndSaveApiSession(user: AppUserModel): Promise<ApiSessionModel> {
    this.logger.debug(`Creating new API session for user: ${user.email}`)
    const currentDtMillis = new Date().getTime()
    return await this.prisma.apiSessionModel.create({
      data: {
        id: ulid(),
        userId: user.id,
        accessToken: this.generateNewSessionToken(),
        refreshToken: this.generateNewSessionToken(),
        accessTokenExpDt: new Date(currentDtMillis + this.accessTokenExpirationSeconds * 1000),
        refreshTokenExpDt: new Date(currentDtMillis + this.refreshTokenExpirationSeconds * 1000),
        ipAddress: this.request.ip,
        startDt: new Date(),
        lastActivityDt: new Date(),
        active: true,
        createdDt: new Date(),
        createdBy: user.id,
        updatedDt: new Date(),
        updatedBy: user.id,
      },
      include: {
        user: true,
      },
    })
  }

  async getActiveApiSession(accessToken: string): Promise<ApiSessionModel> {
    const apiSession = await this.prisma.apiSessionModel.findFirst({
      where: {
        accessToken,
        active: true,
      },
    })

    if (!apiSession) {
      this.logger.error(`Invalid authorization token: ${accessToken}`)
      throw ApiExceptions.BadRequestException(
        'Invalid authorization token',
        `Invalid authorization token ${accessToken}`,
      )
    } else if (apiSession.startDt.getTime() + this.accessTokenExpirationSeconds * 1000 < new Date().getTime()) {
      this.logger.error(`Authorization token revoked: ${accessToken}`)
      throw ApiExceptions.BadRequestException(
        'Authorization token revoked',
        `Authorization token revoked ${accessToken}`,
      )
    }

    return await this.prisma.apiSessionModel.update({
      where: {
        id: apiSession.id,
      },
      data: {
        lastActivityDt: apiSession.lastActivityDt,
      },
    })
  }

  /**
   * Refreshes the access and refresh tokens for the given API session
   * @param apiSession
   */
  async refreshTokens(apiSession: ApiSessionModel): Promise<ApiSessionModel> {
    const currentDate = new Date()
    apiSession.accessToken = this.generateNewSessionToken()
    apiSession.refreshToken = this.generateNewSessionToken()
    apiSession.accessTokenExpDt = new Date(currentDate.getTime() + this.accessTokenExpirationSeconds * 1000)
    apiSession.refreshTokenExpDt = new Date(currentDate.getTime() + this.refreshTokenExpirationSeconds * 1000)
    apiSession.lastActivityDt = currentDate
    return await this.prisma.apiSessionModel.update({
      where: {
        id: apiSession.id,
      },
      data: apiSession,
    })
  }

  async invalidateApiSession(apiSession: ApiSessionModel) {
    await this.prisma.apiSessionModel.update({
      where: {
        id: apiSession.id,
      },
      data: {
        active: false,
      },
    })
  }

  private generateNewSessionToken(): string {
    return generateRandomString(this.sessionTokenLength)
  }
}
