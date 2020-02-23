import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { Role } from '../models/db/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../models/db/relations/user-role.entity';
import { Repository } from 'typeorm';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { EventUser } from '../models/db/relations/event-user.entity';
import { EventOrganization } from '../models/db/relations/event-organization.entity';
import { RoleInput } from './models/role.input';

@Resolver(of => Role)
export class RolesResolver {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(OrganizationUser)
    private readonly organizationUsersRepository: Repository<OrganizationUser>,
    @InjectRepository(EventUser)
    private readonly userEventsRepository: Repository<EventUser>,
    @InjectRepository(EventOrganization)
    private readonly eventOrganizationsRepository: Repository<
      EventOrganization
    >,
  ) {}

  @Query(returns => Role, { name: 'role' })
  async getRole(@Args('id') id: number) {
    return this.rolesRepository.findOne(id);
  }

  @Mutation(returns => Role)
  async createRole(@Args('roleInput') roleInput: RoleInput) {
    return this.rolesRepository.save({ ...roleInput });
  }

  @ResolveProperty('userRoles', () => [UserRole])
  async getUserRoles(@Parent() role) {
    const { id } = role;
    return this.userRolesRepository.find({ where: { roleId: id } });
  }

  @ResolveProperty('userEvents', () => [EventUser])
  async getEventUser(@Parent() role) {
    const { id } = role;
    return this.userEventsRepository.find({ where: { roleId: id } });
  }

  @ResolveProperty('eventOrganizations', () => [EventOrganization])
  async getEventOrganization(@Parent() role) {
    const { id } = role;
    return this.eventOrganizationsRepository.find({ where: { roleId: id } });
  }

  @ResolveProperty('organizationUsers', () => [OrganizationUser])
  async getOrganizationUser(@Parent() role) {
    const { id } = role;
    return this.organizationUsersRepository.find({ where: { roleId: id } });
  }
}
