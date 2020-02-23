import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../models/db/relations/user-role.entity';
import { Repository } from 'typeorm';
import { User } from '../models/db/user.entity';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { EventUser } from '../models/db/relations/event-user.entity';
import { UserAttachment } from '../models/db/relations/user-attachment.entity';
import { UserInput } from './models/user.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(OrganizationUser)
    private readonly organizationUsersRepository: Repository<OrganizationUser>,
    @InjectRepository(EventUser)
    private readonly userEventsRepository: Repository<EventUser>,
    @InjectRepository(UserAttachment)
    private readonly userAttachmentsRepository: Repository<UserAttachment>,
  ) {}

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id') id: number) {
    return this.usersRepository.findOne(id);
  }

  @Mutation(returns => User)
  async createUser(@Args('userInput') userInput: UserInput) {
    return this.usersRepository.save({ ...userInput });
  }

  @ResolveProperty('userRoles', () => [UserRole])
  async getUserRoles(@Parent() user) {
    const { id } = user;
    return this.userRolesRepository.find({ where: { userId: id } });
  }

  @ResolveProperty('userEvents', () => [EventUser])
  async getEventUser(@Parent() user) {
    const { id } = user;
    return this.userEventsRepository.find({ where: { userId: id } });
  }

  @ResolveProperty('userAttachments', () => [UserAttachment])
  async getUserAttachment(@Parent() user) {
    const { id } = user;
    return this.userAttachmentsRepository.find({ where: { userId: id } });
  }

  @ResolveProperty('organizationUsers', () => [OrganizationUser])
  async getOrganizationUser(@Parent() user) {
    const { id } = user;
    return this.organizationUsersRepository.find({ where: { userId: id } });
  }
}