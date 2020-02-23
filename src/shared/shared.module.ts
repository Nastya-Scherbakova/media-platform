import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from '../models/db/attachment.entity';
import { User } from '../models/db/user.entity';
import { UserRole } from '../models/db/relations/user-role.entity';
import { Role } from '../models/db/role.entity';
import { Organization } from '../models/db/organization.entity';
import { EventAttachment } from '../models/db/relations/event-attachment.entity';
import { UserAttachment } from '../models/db/relations/user-attachment.entity';
import { OrganizationAttachment } from '../models/db/relations/organization-attachment.entity';
import { EventOrganization } from '../models/db/relations/event-organization.entity';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { EventUser } from '../models/db/relations/event-user.entity';
import { Event } from '../models/db/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Attachment,
      User,
      UserRole,
      Role,
      Event,
      Organization,
      EventAttachment,
      UserAttachment,
      OrganizationAttachment,
      UserRole,
      EventOrganization,
      OrganizationUser,
      EventUser,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      Attachment,
      User,
      UserRole,
      Role,
      Event,
      Organization,
      EventAttachment,
      UserAttachment,
      OrganizationAttachment,
      UserRole,
      EventOrganization,
      OrganizationUser,
      EventUser,
    ]),
  ],
})
export class SharedModule {}
