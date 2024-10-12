import { UserRole } from '../../../shared/enums'
import { FastifyRequest } from 'fastify'
import { ApiSessionModel, AppUserModel } from '@prisma/client'

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
  apiSession?: ApiSessionModel;
  user?: AppUserModel;
}