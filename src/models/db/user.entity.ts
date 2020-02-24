import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { UserAttachment } from './relations/user-attachment.entity';
import { OrganizationUser } from './relations/organization-user.entity';
import { EventUser } from './relations/event-user.entity';
import { Field, ID, ObjectType } from 'type-graphql';
import { UserRole } from './relations/user-role.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @Column({ name: 'first_name', nullable: true })
  @Field({ nullable: true })
  firstName: string;
  @Column({ name: 'last_name', nullable: true })
  @Field({ nullable: true })
  lastName: string;
  @Column()
  @Field()
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  about: string;
  @OneToMany(
    type => UserRole,
    userRole => userRole.user,
  )
  @Field(type => [UserRole])
  userRoles: UserRole[];
  @OneToMany(
    type => UserAttachment,
    userAtt => userAtt.user,
  )
  @Field(type => [UserAttachment])
  userAttachments: UserAttachment[];
  @OneToMany(
    type => OrganizationUser,
    userOrg => userOrg.user,
  )
  @Field(type => [OrganizationUser])
  userOrganizations: OrganizationUser[];
  @OneToMany(
    type => EventUser,
    userEvent => userEvent.user,
  )
  @Field(type => [EventUser])
  userEvents: EventUser[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
