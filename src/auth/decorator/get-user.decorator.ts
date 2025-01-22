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
      return request.user[data];
    }
    return request.user;
  },
);

export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflactor.getAllAndOverride<AuthRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
