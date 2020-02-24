import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Attachment } from '../attachment.entity';
import { Organization } from '../organization.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class OrganizationAttachment {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @OneToOne(
    type => Attachment,
    f => f.organizationAttachment,
  )
  @JoinColumn()
  @Field(type => Attachment)
  attachment: Attachment;
  @ManyToOne(
    type => Organization,
    org => org.organizationAttachments,
  )
  @Field(type => Organization)
  organization: Organization;
}
