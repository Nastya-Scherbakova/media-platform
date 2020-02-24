import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { EventAttachment } from './relations/event-attachment.entity';
import { OrganizationAttachment } from './relations/organization-attachment.entity';
import { UserAttachment } from './relations/user-attachment.entity';

@Entity()
@ObjectType()
export class Attachment {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @Column()
  @Field(type => String)
  link: string;
  @OneToOne(type => EventAttachment)
  @Field(type => [EventAttachment], { nullable: true })
  eventAttachment?: EventAttachment;
  @OneToOne(type => OrganizationAttachment)
  @Field(type => [OrganizationAttachment], { nullable: true })
  organizationAttachment?: OrganizationAttachment;
  @OneToOne(type => UserAttachment)
  @Field(type => [UserAttachment], { nullable: true })
  userAttachment?: UserAttachment;
}
