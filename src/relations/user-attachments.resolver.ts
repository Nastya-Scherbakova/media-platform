import {
  Resolver,
  ResolveProperty,
  Query,
  Args,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserAttachment } from '../models/db/relations/user-attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from '../models/db/attachment.entity';
import { User } from '../models/db/user.entity';
import { UserAttachmentInput } from './models/user-attachment.input';

@Resolver(() => UserAttachment)
export class UserAttachmentsResolver {
  constructor(
    @InjectRepository(UserAttachment)
    private readonly userAttachmentsRepository: Repository<UserAttachment>,
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Query(returns => UserAttachment, { name: 'userAttachment' })
  async getUserAttachment(@Args('id') id: number) {
    return this.userAttachmentsRepository.findOne(id);
  }

  @Mutation(returns => UserAttachment)
  async createUserAttachment(
    @Args('userAttachmentInput') userAttachmentInput: UserAttachmentInput,
  ) {
    let attachment = await this.attachmentsRepository.findOne(
      userAttachmentInput.attachmentId,
    );
    const user = await this.usersRepository.findOne(userAttachmentInput.userId);
    return this.userAttachmentsRepository.save({ attachment, user });
  }

  @ResolveProperty('attachment', () => [Attachment])
  async getAttachment(@Parent() userAttachment) {
    const { id } = userAttachment;
    return (
      await this.userAttachmentsRepository.findOne(id, {
        relations: ['attachment'],
      })
    ).attachment;
  }

  @ResolveProperty('user', () => [User])
  async getUser(@Parent() userAttachment) {
    const { id } = userAttachment;
    return (
      await this.userAttachmentsRepository.findOne(id, { relations: ['user'] })
    ).user;
  }
}
