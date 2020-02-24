import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../models/db/organization.entity';
import { User } from '../models/db/user.entity';
import { Role } from '../models/db/role.entity';
import { OrganizationUserInput } from './models/organization-user.input';

@Resolver(() => OrganizationUser)
export class OrganizationUsersResolver {
  constructor(
    @InjectRepository(OrganizationUser)
    private readonly userOrganizationsRepository: Repository<OrganizationUser>,
    @InjectRepository(Organization)
    private readonly organizationsRepository: Repository<Organization>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  @Query(returns => OrganizationUser, { name: 'userOrganization' })
  async getUserOrganization(@Args('id') id: number) {
    return this.userOrganizationsRepository.findOne(id);
  }

  @Mutation(returns => OrganizationUser)
  async createOrganizationUser(
    @Args('organizationUserInput') organizationUserInput: OrganizationUserInput,
  ) {
    let user = await this.usersRepository.findOne(organizationUserInput.userId);
    const organization = await this.organizationsRepository.findOne(
      organizationUserInput.organizationId,
    );
    return this.userOrganizationsRepository.save({ user, organization });
  }

  @ResolveProperty('organization', () => Organization)
  async getOrganization(@Parent() userOrganization) {
    const { id } = userOrganization;
    return (
      await this.userOrganizationsRepository.findOne(id, {
        relations: ['organization'],
      })
    ).organization;
  }

  @ResolveProperty('user', () => User)
  async getUser(@Parent() userOrganization) {
    const { id } = userOrganization;
    return (
      await this.userOrganizationsRepository.findOne(id, {
        relations: ['user'],
      })
    ).user;
  }

  @ResolveProperty('role', () => [Role])
  async getRole(@Parent() userOrganization) {
    const { id } = userOrganization;
    return (
      await this.userOrganizationsRepository.findOne(id, {
        relations: ['role'],
      })
    ).role;
  }
}
