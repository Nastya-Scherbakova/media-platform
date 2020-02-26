import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../models/db/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = GqlExecutionContext.create(context).getContext().req;
    const user = request.user;
    return this.matchRoles(roles, user);
  }

  private async matchRoles(roles: string[], user: User): Promise<boolean> {
    let rolesMatched = user.userRoles
      .map(el => el.role.name)
      .filter(role => roles.indexOf(role) !== -1);
    if (rolesMatched.length === 0) {
      return false;
    }
    return true;
  }
}
