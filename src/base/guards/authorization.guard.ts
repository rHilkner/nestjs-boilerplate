import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../shared/enums';
import { RequestContext } from '../../common/interfaces/request-context';

/**
 * Custom decorator to specify roles required to access a route.
 * @param roles - The roles required.
 */
export const AuthorizeRoles = (roles: UserRole[]) => SetMetadata('roles', roles);

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    /**
     * Determines whether the current user has the required role(s).
     * @param context - The execution context.
     * @returns True if the user has one of the required roles, false otherwise.
     */
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        // Safely cast the request to RequestDetails that was bound on the AuthenticationInterceptor
        const request = context.switchToHttp().getRequest<RequestContext>();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('User is not authenticated');
        }

        return roles.includes(user.role);
    }
}
