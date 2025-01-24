import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRole } from '../type';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user ? request.user[data] : null;
    }
    return request.user || null;
  },
);
