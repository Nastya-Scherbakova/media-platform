import { Module } from '@nestjs/common';
import { UserAttachmentsResolver } from './user-attachments.resolver';
import { OrganizationAttachmentsResolver } from './organization-attachments.resolver';
import { EventAttachmentsResolver } from './event-attachments.resolver';
import { EventOrganizationsResolver } from './event-organizations.resolver';
import { EventUsersResolver } from './event-users.resolver';
import { OrganizationUsersResolver } from './organization-users.resolver';
import { UserRolesResolver } from './user-roles.resolver';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [
    UserAttachmentsResolver,
    OrganizationAttachmentsResolver,
    EventAttachmentsResolver,
    EventOrganizationsResolver,
    EventUsersResolver,
    OrganizationUsersResolver,
    UserRolesResolver,
  ],
})
export class RelationsModule {}
