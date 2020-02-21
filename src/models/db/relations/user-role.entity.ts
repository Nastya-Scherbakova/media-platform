import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user.entity';
import { Role } from '../role.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class UserRole {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @ManyToOne(
    type => Role,
    role => role.userRoles,
  )
  @Field(type => Role)
  role: Promise<Role>;
  @ManyToOne(
    type => User,
    user => user.userRoles,
  )
  @Field(type => User)
  user: Promise<User>;
}
