import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../models/db/organization.entity';
import { User } from '../models/db/user.entity';
import { Role } from '../models/db/role.entity';

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
    ) { }

    @Query(returns => OrganizationUser, { name: 'userOrganization' })
    async getUserOrganization(@Args('id') id: number) {
        return this.userOrganizationsRepository.findOne(id);
    }

    @ResolveProperty('organization', () => Organization)
    async getOrganization(@Parent() userOrganization) {
        const { organizationId } = userOrganization;
        return this.organizationsRepository.findOne(organizationId);
    }

    @ResolveProperty('user', () => User)
    async getUser(@Parent() userOrganization) {
        const { userId } = userOrganization;
        return this.usersRepository.findOne(userId);
    }

    @ResolveProperty('role', () => [Role])
    async getRole(@Parent() userOrganization) {
        const { roleId } = userOrganization;
        return this.rolesRepository.findOne(roleId);
    }
}
