import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { EventOrganization } from '../models/db/relations/event-organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../models/db/organization.entity';
import { Role } from '../models/db/role.entity';
import { Event } from '../models/db/event.entity';
import { EventOrganizationInput } from './models/event-organization.input';

@Resolver(() => EventOrganization)
export class EventOrganizationsResolver {
  constructor(
    @InjectRepository(EventOrganization)
    private readonly eventOrganizationsRepository: Repository<
      EventOrganization
    >,
    @InjectRepository(Organization)
    private readonly organizationsRepository: Repository<Organization>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  @Query(returns => EventOrganization, { name: 'eventOrganization' })
  async getEventOrganization(@Args('id') id: number) {
    return this.eventOrganizationsRepository.findOne(id);
  }

  @Mutation(returns => EventOrganization)
  async createEventOrganization(
    @Args('eventOrganizationInput')
    eventOrganizationInput: EventOrganizationInput,
  ) {
    let org = this.organizationsRepository.findOne(
      eventOrganizationInput.organizationId,
    );
    const event = this.eventsRepository.findOne(eventOrganizationInput.eventId);
    return this.eventOrganizationsRepository.save({ organization: org, event });
  }

  @ResolveProperty('organization', () => Organization)
  async getOrganization(@Parent() eventOrganization) {
    const { organizationId } = eventOrganization;
    return this.organizationsRepository.findOne(organizationId);
  }

  @ResolveProperty('event', () => Event)
  async getEvent(@Parent() eventOrganization) {
    const { eventId } = eventOrganization;
    return this.eventsRepository.findOne(eventId);
  }

  @ResolveProperty('role', () => [Role])
  async getRole(@Parent() eventOrganization) {
    const { roleId } = eventOrganization;
    return this.rolesRepository.findOne(roleId);
  }
}
