import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrganizationUser } from './relations/organization-user.entity';
import { EventOrganization } from './relations/event-organization.entity';
import { OrganizationAttachment } from './relations/organization-attachment.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Organization {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @Column()
  @Field()
  name: string;
  @OneToMany(
    type => OrganizationUser,
    userOrg => userOrg.organization,
  )
  @Field(type => [OrganizationUser])
  organizationUsers: Promise<OrganizationUser[]>;
  @OneToMany(
    type => EventOrganization,
    orgEvent => orgEvent.organization,
  )
  @Field(type => [EventOrganization])
  organizationEvents: Promise<EventOrganization[]>;
  @OneToMany(
    type => OrganizationAttachment,
    orgAtt => orgAtt.organization,
  )
  @Field(type => [OrganizationAttachment])
  organizationAttachments: Promise<OrganizationAttachment[]>;
}
