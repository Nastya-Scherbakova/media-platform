import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Event } from '../event.entity';
import { User } from '../user.entity';
import { Role } from '../role.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class EventUser {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @ManyToOne(
    type => Role,
    role => role.userEvents,
  )
  @Field(type => Role)
  role: Promise<Role>;
  @ManyToOne(
    type => Event,
    event => event.eventUsers,
  )
  @Field(type => Event)
  event: Promise<Event>;
  @ManyToOne(
    type => User,
    user => user.userEvents,
  )
  @Field(type => User)
  user: Promise<User>;
}
