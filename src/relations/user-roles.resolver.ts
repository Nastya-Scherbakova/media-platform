import {
  Resolver,
  ResolveProperty,
  Query,
  Args,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserRole } from '../models/db/relations/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../models/db/role.entity';
import { User } from '../models/db/user.entity';
import { UserRoleInput } from './models/user-role.input';
import { Roles } from '../shared/decorators/decorators';

@Resolver(() => UserRole)
export class UserRolesResolver {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Query(returns => UserRole, { name: 'userRole' })
  async getUserRole(@Args('id') id: number) {
    return this.userRolesRepository.findOne(id);
  }

  @Mutation(returns => UserRole)
  @Roles('admin')
  async createUserRole(@Args('userRoleInput') userRoleInput: UserRoleInput) {
    let role = await this.rolesRepository.findOne(userRoleInput.roleId);
    const user = await this.usersRepository.findOne(userRoleInput.userId);
    return this.userRolesRepository.save({ role, user });
  }

  @ResolveProperty('role', () => Role)
  async getRole(@Parent() userRole) {
    const { id } = userRole;
    return (await this.userRolesRepository.findOne(id, { relations: ['role'] }))
      .role;
  }

  @ResolveProperty('user', () => User)
  async getUser(@Parent() userRole) {
    const { id } = userRole;
    return (await this.userRolesRepository.findOne(id, { relations: ['user'] }))
      .user;
  }
}
