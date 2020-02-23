import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class UserAttachmentInput {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  attachmentId: number;
}
