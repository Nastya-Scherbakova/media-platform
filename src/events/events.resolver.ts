import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventInput } from './models/event.input';
import { Event } from '../models/db/event.entity';
import { EventAttachment } from '../models/db/relations/event-attachment.entity';
import { EventUser } from '../models/db/relations/event-user.entity';
import { EventOrganization } from '../models/db/relations/event-organization.entity';

@Resolver(of => Event)
export class EventsResolver {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(EventAttachment)
    private readonly eventAttachmentsRepository: Repository<EventAttachment>,
    @InjectRepository(EventUser)
    private readonly eventUsersRepository: Repository<EventUser>,
    @InjectRepository(EventOrganization)
    private readonly eventOrganizationsRepository: Repository<
      EventOrganization
    >,
  ) {}

  @Query(returns => Event, { name: 'event' })
  async getEvent(@Args('id') id: number) {
    return this.eventsRepository.findOne(id);
  }

  @Mutation(returns => Event)
  async createEvent(@Args('eventInput') eventInput: EventInput) {
    return this.eventsRepository.save({ ...eventInput });
  }

  @ResolveProperty('eventAttachments', () => [EventAttachment])
  async getEventAttachments(@Parent() event) {
    const { id } = event;
    return this.eventAttachmentsRepository.find({ where: { event: { id } } });
  }

  @ResolveProperty('eventUsers', () => [EventUser])
  async getEventUsers(@Parent() event) {
    const { id } = event;
    return this.eventUsersRepository.find({ where: { event: { id } } });
  }

  @ResolveProperty('eventOrganizations', () => [EventOrganization])
  async getEventOrganizations(@Parent() event) {
    const { id } = event;
    return this.eventOrganizationsRepository.find({ where: { event: { id } } });
  }
}
