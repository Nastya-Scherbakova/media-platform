import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { EventOrganization } from './relations/event-organization.entity';
import { EventUser } from './relations/event-user.entity';
import { OrganizationUser } from './relations/organization-user.entity';
import { UserRole } from './relations/user-role.entity';

@Entity()
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @Column()
  @Field()
  name: string;
  @OneToMany(
    type => EventOrganization,
    r => r.role,
  )
  @Field(type => EventOrganization)
  eventOrganizations: EventOrganization[];
  @OneToMany(
    type => EventUser,
    r => r.role,
  )
  @Field(type => EventUser)
  userEvents: EventUser[];
  @OneToMany(
    type => OrganizationUser,
    r => r.role,
  )
  @Field(type => OrganizationUser)
  organizationUsers: OrganizationUser[];
  @OneToMany(
    type => UserRole,
    r => r.role,
  )
  @Field(type => UserRole)
  userRoles: UserRole[];
}
