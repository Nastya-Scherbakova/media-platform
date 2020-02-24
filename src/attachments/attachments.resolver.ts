import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Attachment } from '../models/db/attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventAttachment } from '../models/db/relations/event-attachment.entity';
import { OrganizationAttachment } from '../models/db/relations/organization-attachment.entity';
import { UserAttachment } from '../models/db/relations/user-attachment.entity';
import { AttachmentInput } from './models/attachment.input';

@Resolver(() => Attachment)
export class AttachmentsResolver {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
    @InjectRepository(EventAttachment)
    private readonly eventAttachmentsRepository: Repository<EventAttachment>,
    @InjectRepository(OrganizationAttachment)
    private readonly organizationAttachmentsRepository: Repository<
      OrganizationAttachment
    >,
    @InjectRepository(UserAttachment)
    private readonly userAttachmentsRepository: Repository<UserAttachment>,
  ) {}

  @Query(returns => Attachment, { name: 'attachment' })
  async getAttachment(@Args('id') id: number) {
    return this.attachmentsRepository.findOne(id);
  }

  @Mutation(returns => Attachment)
  async createAttachment(
    @Args('attachmentInput') attachmentInput: AttachmentInput,
  ) {
    // workaround until https://github.com/typeorm/typeorm/issues/2065 will be fixed
    return this.attachmentsRepository.save({ ...attachmentInput });
  }

  @ResolveProperty('eventAttachment', () => [EventAttachment], {
    nullable: true,
  })
  async getEventAttachment(@Parent() attachment) {
    const { id } = attachment;
    return this.eventAttachmentsRepository.findOne({
      where: { attachment: { id } },
    });
  }

  @ResolveProperty('organizationAttachment', () => [OrganizationAttachment], {
    nullable: true,
  })
  async getOrganizationAttachment(@Parent() attachment) {
    const { id } = attachment;
    return this.organizationAttachmentsRepository.findOne({
      where: { attachment: { id } },
    });
  }

  @ResolveProperty('userAttachment', () => [UserAttachment], { nullable: true })
  async getUserAttachment(@Parent() attachment) {
    const { id } = attachment;
    return this.userAttachmentsRepository.findOne({
      where: { attachment: { id } },
    });
  }
}
