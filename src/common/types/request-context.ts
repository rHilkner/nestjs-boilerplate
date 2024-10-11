import { UserRole } from '../../../shared/enums'
import { FastifyRequest } from 'fastify'
import { ApiSession } from '../../modules/api-session/api-session.model'

export type RequestContext = FastifyRequest & {
  raw: RequestCustomContext;
};

export type RequestMiddlewareContext = FastifyRequest & RequestCustomContext;

export interface JwtData {
  id: string;
  email: string;
  role: UserRole;
}

export interface RequestCustomContext {
  requestId: string;
  jwtData?: JwtData;
  apiSession?: ApiSession;
}