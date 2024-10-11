import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../common/enums/user-role';
import { User } from '../../modules/users/user.model';
import { RequestDetails } from '../../common/interfaces/request-details'

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request: RequestDetails = context.switchToHttp().getRequest();
        const user: User = request.user;
        return roles.includes(user.role);
    }
}
