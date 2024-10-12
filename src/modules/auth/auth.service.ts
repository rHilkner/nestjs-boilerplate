import { Inject, Injectable, Logger } from '@nestjs/common'
import { ApiExceptions } from '../../common/exceptions/api-exceptions'
import { ApiSessionService } from '../api-session/api-session.service'
import { UserService } from '../users/user.service'
import { REQUEST } from '@nestjs/core'
import { RequestContext } from '../../common/types/request-context'
import { ApiSessionModel } from '@prisma/client'
import { LoginDTO } from '../../../shared/dtos/user-dtos'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly apiSessionService: ApiSessionService,
    private readonly userService: UserService,
  ) {
  }

  /**
   * Authenticates a user and returns a new API session
   * @param email
   * @param password
   */
  async login({ email }: LoginDTO): Promise<ApiSessionModel> {
    // TODO auth with Google, Facebook
    const user = await this.userService.findByEmail(email)
    if (user == null) {
      throw ApiExceptions.UnauthorizedException(
        'Invalid credentials',
        `Invalid credentials for user [${email}]`,
      )
    }
    this.logger.log(`Attempting to authenticate [${user.role} / ${user.email}] with password`)
    return await this.apiSessionService.createAndSaveApiSession(user)
  }

  async signOut(): Promise<void> {
    const apiSession = this.request.raw.apiSession
    if (apiSession == null) {
      this.logger.warn('No API session found to sign out')
      return
    }
    await this.apiSessionService.invalidateApiSession(apiSession)
    this.logger.log(`Signed out API session [${apiSession.id}]`)
  }

  async refreshTokens(): Promise<ApiSessionModel> {
    const apiSession = this.request.raw.apiSession
    if (apiSession == null) {
      throw ApiExceptions.UnauthorizedException(
        'No API session found',
        'No API session found to refresh tokens',
      )
    }
    const newApiSession = await this.apiSessionService.refreshTokens(apiSession)
    this.logger.log(`Refreshed tokens for API session [${apiSession.id}]`)
    return newApiSession
  }
}
