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
import { UseGuards, SetMetadata } from '@nestjs/common';
import { GqlAuthGuard } from '../shared/guards/auth.guard';
import { Roles, GqlUser } from '../shared/decorators/decorators';
import { RolesGuard } from '../shared/guards/roles.guard';

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
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@GqlUser() user: User) {
    return user;
  }

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id') id: number) {
    return this.usersRepository.findOne(id);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  async createUser(@Args('userInput') userInput: UserInput) {
    return this.usersRepository.save({ ...userInput });
  }

  @ResolveProperty('userRoles', () => [UserRole])
  async getUserRoles(@Parent() user) {
    const { id } = user;
    return this.userRolesRepository.find({ where: { user: { id } } });
  }

  @ResolveProperty('userEvents', () => [EventUser])
  async getEventUser(@Parent() user) {
    const { id } = user;
    return this.userEventsRepository.find({ where: { user: { id } } });
  }

  @ResolveProperty('userAttachments', () => [UserAttachment])
  async getUserAttachment(@Parent() user) {
    const { id } = user;
    return this.userAttachmentsRepository.find({ where: { user: { id } } });
  }

  @ResolveProperty('organizationUsers', () => [OrganizationUser])
  async getOrganizationUser(@Parent() user) {
    const { id } = user;
    return this.organizationUsersRepository.find({ where: { user: { id } } });
  }
}
