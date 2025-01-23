import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRole } from '../type';
import { ROLES_KEY } from 'src/utils/roles.util';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user ? request.user[data] : null;
    }
    return request.user || null;
  },
);

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AuthRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    // Add a null check for user
    if (!user || !user.role) {
      return false; // If user or user.role is undefined, deny access
    }

    return requiredRoles.some((role) => user.role.includes(role));
  }
}
