import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { EventUser } from '../models/db/relations/event-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/db/user.entity';
import { Role } from '../models/db/role.entity';
import { Event } from '../models/db/event.entity';
import { EventUserInput } from './models/event-user.input';

@Resolver(() => EventUser)
export class EventUsersResolver {
  constructor(
    @InjectRepository(EventUser)
    private readonly eventUsersRepository: Repository<EventUser>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  @Query(returns => EventUser, { name: 'eventUser' })
  async getEventUser(@Args('id') id: number) {
    return this.eventUsersRepository.findOne(id);
  }

  @Mutation(returns => EventUser)
  async createEventUser(
    @Args('eventUserInput') eventUserInput: EventUserInput,
  ) {
    let user = this.usersRepository.findOne(eventUserInput.userId);
    const event = this.eventsRepository.findOne(eventUserInput.eventId);
    return this.eventUsersRepository.save({ user, event });
  }

  @ResolveProperty('user', () => User)
  async getUser(@Parent() eventUser) {
    const { userId } = eventUser;
    return this.usersRepository.findOne(userId);
  }

  @ResolveProperty('event', () => Event)
  async getEvent(@Parent() eventUser) {
    const { eventId } = eventUser;
    return this.eventsRepository.findOne(eventId);
  }

  @ResolveProperty('role', () => [Role])
  async getRole(@Parent() eventUser) {
    const { roleId } = eventUser;
    return this.rolesRepository.findOne(roleId);
  }
}
