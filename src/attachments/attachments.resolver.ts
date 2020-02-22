import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { Attachment } from 'src/models/db/attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventAttachment } from 'src/models/db/relations/event-attachment.entity';
import { OrganizationAttachment } from 'src/models/db/relations/organization-attachment.entity';
import { UserAttachment } from 'src/models/db/relations/user-attachment.entity';

@Resolver(of => Attachment)
export class AttachmentsResolver {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
    @InjectRepository(EventAttachment)
    private readonly eventAttachmentsRepository: Repository<EventAttachment>,
    @InjectRepository(OrganizationAttachment)
    private readonly organizationAttachmentsRepository: Repository<OrganizationAttachment>,
    @InjectRepository(UserAttachment)
    private readonly userAttachmentsRepository: Repository<UserAttachment>,
  ) { }

  @Query('attachment')
  async getAttachment(@Args('id') id: number) {
    return this.attachmentsRepository.findOne(id);
  }

  @ResolveProperty('eventAttachment')
  async getEventAttachment(@Parent() attachment) {
    const { id } = attachment;
    return this.eventAttachmentsRepository.findOne({ where: { attachmentId: id } });
  }

  @ResolveProperty('organizationAttachment')
  async getOrganizationAttachment(@Parent() attachment) {
    const { id } = attachment;
    return this.organizationAttachmentsRepository.findOne({ where: { attachmentId: id } });
  }

  @ResolveProperty('userAttachment')
  async getUserAttachment(@Parent() attachment) {
    const { id } = attachment;
    return this.userAttachmentsRepository.findOne({ where: { attachmentId: id } });
  }
}
