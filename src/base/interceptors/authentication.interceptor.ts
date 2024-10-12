import {
  CallHandler,
  ExecutionContext,
  Injectable, Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtData, RequestContext } from '../../common/types/request-context'

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuthenticationInterceptor.name)

  public intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const request: RequestContext = context.switchToHttp().getRequest()

    const [
      bearer,
      token,
    ] = request.headers.authorization?.split(' ') ?? []

    if (bearer === 'Bearer' && token) {
      const jwtData = this.decodeJwt(token)
      if (jwtData) {
        this.logger.debug(`JWT user authenticated: ${jwtData.userEmail}`)
        request.raw.jwtData = jwtData
      }
    }

    return next.handle()
  }

  private decodeJwt(token: string): JwtData | null {
    const base64Payload = token.split('.')[1]
    const payloadBuffer = Buffer.from(base64Payload, 'base64')
    try {
      return JSON.parse(payloadBuffer.toString()) as JwtData
    } catch {
      this.logger.error('Invalid JWT token', { token })
      return null
    }
  }
}
