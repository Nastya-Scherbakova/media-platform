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
  async createUserRole(@Args('userRoleInput') userRoleInput: UserRoleInput) {
    let role = this.rolesRepository.findOne(userRoleInput.roleId);
    const user = this.usersRepository.findOne(userRoleInput.userId);
    return this.userRolesRepository.save({ role, user });
  }

  @ResolveProperty('role', () => Role)
  async getRole(@Parent() userRole) {
    const { roleId } = userRole;
    return this.rolesRepository.findOne(roleId);
  }

  @ResolveProperty('user', () => User)
  async getUser(@Parent() userRole) {
    const { userId } = userRole;
    return this.usersRepository.findOne(userId);
  }
}
