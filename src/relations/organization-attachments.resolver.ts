import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { OrganizationAttachment } from '../models/db/relations/organization-attachment.entity';
import { Organization } from '../models/db/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from '../models/db/attachment.entity';
import { OrganizationAttachmentInput } from './models/organization-attachment.input';

@Resolver(() => OrganizationAttachment)
export class OrganizationAttachmentsResolver {
  constructor(
    @InjectRepository(OrganizationAttachment)
    private readonly organizationAttachmentsRepository: Repository<
      OrganizationAttachment
    >,
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
    @InjectRepository(Organization)
    private readonly organizationsRepository: Repository<Organization>,
  ) {}

  @Query(returns => OrganizationAttachment, { name: 'organizationAttachment' })
  async getOrganizationAttachment(@Args('id') id: number) {
    return this.organizationAttachmentsRepository.findOne(id);
  }

  @Mutation(returns => OrganizationAttachment)
  async createOrganizationAttachment(
    @Args('organizationAttachmentInput')
    organizationAttachmentInput: OrganizationAttachmentInput,
  ) {
    let attachment = this.attachmentsRepository.findOne(
      organizationAttachmentInput.attachmentId,
    );
    const organization = this.organizationsRepository.findOne(
      organizationAttachmentInput.organizationId,
    );
    return this.organizationAttachmentsRepository.save({
      attachment,
      organization,
    });
  }

  @ResolveProperty('attachment', () => Attachment)
  async getAttachment(@Parent() organizationAttachment) {
    const { attachmentId } = organizationAttachment;
    return this.attachmentsRepository.findOne(attachmentId);
  }

  @ResolveProperty('organization', () => Organization)
  async getOrganization(@Parent() organizationAttachment) {
    const { organizationId } = organizationAttachment;
    return this.organizationsRepository.findOne(organizationId);
  }
}
