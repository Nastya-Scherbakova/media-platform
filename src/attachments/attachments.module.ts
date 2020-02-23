import { Module } from '@nestjs/common';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { AttachmentsResolver } from './attachments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAttachment } from '../models/db/relations/event-attachment.entity';
import { UserAttachment } from '../models/db/relations/user-attachment.entity';
import { OrganizationAttachment } from '../models/db/relations/organization-attachment.entity';
import { Attachment } from '../models/db/attachment.entity';
import { User } from '../models/db/user.entity';
import { UserRole } from '../models/db/relations/user-role.entity';
import { Role } from '../models/db/role.entity';
import { EventOrganization } from '../models/db/relations/event-organization.entity';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { EventUser } from '../models/db/relations/event-user.entity';
import { Event } from '../models/db/event.entity';
import { Organization } from '../models/db/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment, EventAttachment, UserAttachment, OrganizationAttachment, User, UserRole, Role, EventOrganization, OrganizationUser, EventUser, Event, Organization])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, 
    AttachmentsResolver
  ]
})
export class AttachmentsModule { }
