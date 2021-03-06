import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class EventAttachmentInput {
  @Field(() => Int)
  eventId: number;
  @Field(() => Int)
  attachmentId: number;
}
