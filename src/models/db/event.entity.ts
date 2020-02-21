import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventAttachment } from './relations/event-attachment.entity';
import { EventOrganization } from './relations/event-organization.entity';
import { EventUser } from './relations/event-user.entity';
import { Field, ID, ObjectType, Int, GraphQLTimestamp } from 'type-graphql';

@Entity()
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @Column()
  @Field()
  name: string;
  @Column({ name: 'additional_info' })
  @Field({ nullable: true })
  additionalInfo: string;
  @Column()
  @Field(type => Int)
  type: EventType;
  @Column({ name: 'cron_start' })
  @Field({ nullable: true })
  cronStart: string;
  @Column({ name: 'cron_end' })
  @Field({ nullable: true })
  cronEnd: string;
  @Column({ name: 'date_start', type: 'timestamp with time zone' })
  @Field(type => GraphQLTimestamp)
  dateStart: Date;
  @Column({ name: 'date_end', type: 'timestamp with time zone' })
  @Field(type => GraphQLTimestamp)
  dateEnd: Date;
  @Column()
  @Field(type => Int)
  completleness = 0;
  @OneToMany(
    type => EventUser,
    eventUser => eventUser.event,
  )
  @Field(type => [EventUser])
  eventUsers: EventUser[];
  @OneToMany(
    type => EventAttachment,
    eventAtt => eventAtt.event,
  )
  @Field(type => [EventAttachment])
  eventAttachments: EventAttachment[];
  @OneToMany(
    type => EventOrganization,
    eventOrg => eventOrg.event,
  )
  @Field(type => [EventOrganization])
  eventOrganizations: EventOrganization[];
}

export enum EventType {
  Recurring,
  OneTime,
}
