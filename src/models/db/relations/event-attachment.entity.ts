import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Attachment } from '../attachment.entity';
import { Event } from '../event.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class EventAttachment {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @OneToOne(
    type => Attachment,
    f => f.eventAttachment,
  )
  @JoinColumn()
  @Field(type => Attachment)
  attachment: Attachment;
  @ManyToOne(
    type => Event,
    event => event.eventAttachments,
  )
  @Field(type => Event)
  event: Event;
}
