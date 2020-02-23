import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { Repository } from 'typeorm';
import { Organization } from '../models/db/organization.entity';
import { EventOrganization } from '../models/db/relations/event-organization.entity';
import { OrganizationAttachment } from '../models/db/relations/organization-attachment.entity';
import { OrganizationInput } from './models/organization.input';

@Resolver(of => Organization)
export class OrganizationsResolver {
  constructor(
    @InjectRepository(OrganizationUser)
    private readonly userOrganizationsRepository: Repository<OrganizationUser>,
    @InjectRepository(Organization)
    private readonly organizationsRepository: Repository<Organization>,
    @InjectRepository(EventOrganization)
    private readonly organizationEventsRepository: Repository<
      EventOrganization
    >,
    @InjectRepository(OrganizationAttachment)
    private readonly organizationAttachmentsRepository: Repository<
      OrganizationAttachment
    >,
  ) {}

  @Query(returns => Organization, { name: 'organization' })
  async getOrganization(@Args('id') id: number) {
    return this.organizationsRepository.findOne(id);
  }

  @Mutation(returns => Organization)
  async createOrganization(
    @Args('organizationInput') organizationInput: OrganizationInput,
  ) {
    return this.organizationsRepository.save({ ...organizationInput });
  }

  @ResolveProperty('organizationUsers', () => [OrganizationUser])
  async getOrganizationUsers(@Parent() organization) {
    const { id } = organization;
    return this.userOrganizationsRepository.find({
      where: { organizationId: id },
    });
  }

  @ResolveProperty('organizationEvents', () => [EventOrganization])
  async getEventOrganizations(@Parent() organization) {
    const { id } = organization;
    return this.organizationEventsRepository.find({
      where: { organizationId: id },
    });
  }

  @ResolveProperty('organizationAttachments', () => [OrganizationAttachment])
  async getOrganizationAttachments(@Parent() organization) {
    const { id } = organization;
    return this.organizationAttachmentsRepository.find({
      where: { organizationId: id },
    });
  }
}
