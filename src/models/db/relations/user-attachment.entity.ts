import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Attachment } from '../attachment.entity';
import { User } from '../user.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class UserAttachment {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;
  @OneToOne(
    type => Attachment,
    f => f.userAttachment,
  )
  @JoinColumn()
  @Field(type => Attachment)
  attachment: Attachment;
  @ManyToOne(
    type => User,
    user => user.userAttachments,
  )
  @Field(type => User)
  user: User;
}
