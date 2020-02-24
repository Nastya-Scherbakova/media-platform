import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../organization.entity';
import { Event } from '../event.entity';
import { Role } from '../role.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class EventOrganization {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @ManyToOne(
    type => Role,
    role => role.eventOrganizations,
  )
  @Field(type => Role)
  role: Role;
  @ManyToOne(
    type => Event,
    event => event.eventOrganizations,
  )
  @Field(type => Event)
  event: Event;
  @ManyToOne(
    type => Organization,
    org => org.organizationEvents,
  )
  @Field(type => Organization)
  organization: Organization;
}
