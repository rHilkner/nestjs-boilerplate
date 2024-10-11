import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import {
  FastifyReply,
} from 'fastify'
import { ulid } from 'ulid'
import { RequestMiddlewareContext } from '../../common/types/request-context'

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {

  public use(req: RequestMiddlewareContext, _res: FastifyReply, next: () => void): void {
    req.requestId = ulid()
    next()
  }

}
