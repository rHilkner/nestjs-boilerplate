import { UserRole } from '../../../shared/enums'
import { FastifyRequest } from 'fastify'
import { ApiSession } from '../../modules/api-session/api-session.model'
import { User } from '../../modules/users/user.model'

export type RequestContext = FastifyRequest & {
  raw: RequestCustomContext;
};

export type RequestMiddlewareContext = FastifyRequest & RequestCustomContext;

export interface JwtData {
  sessionId: string;
  userId: string;
  userEmail: string;
  userRole: UserRole;
}

export interface RequestCustomContext {
  requestId: string;
  jwtData?: JwtData;
  apiSession?: ApiSession;
  user?: User;
}