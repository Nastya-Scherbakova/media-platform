import { createParamDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../../models/db/user.entity';

export const ResGql = createParamDecorator(
  (data, [root, args, ctx, info]): Response => ctx.res,
);

export const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.req && ctx.req.user,
);

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
