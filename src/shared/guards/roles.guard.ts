import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '../../models/db/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../models/db/role.entity';
import { UserRole } from '../../models/db/relations/user-role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Role)
    private readonly userRolesRepository: Repository<UserRole>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user);
  }

  private async matchRoles(roles: string[], user: User): Promise<boolean> {
    //TODO: change to add roles to request obj on auth
    let userRoles = await this.userRolesRepository.find({
      where: { userId: user.id, role: { name: roles } },
    });
    if (!userRoles) {
      return false;
    }
    return true;
  }
}
