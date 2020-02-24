import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { User } from '../user.entity';
import { Organization } from '../organization.entity';
import { Role } from '../role.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class OrganizationUser {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @ManyToOne(
    type => Role,
    role => role.organizationUsers,
  )
  @Field(type => Role)
  role: Role;
  @ManyToOne(
    type => User,
    user => user.userOrganizations,
  )
  @Field(type => User)
  user: User;
  @ManyToOne(
    type => Organization,
    org => org.organizationUsers,
  )
  @Field(type => Organization)
  organization: Organization;
}
