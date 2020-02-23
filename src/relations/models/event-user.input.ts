import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class EventUserInput {
  @Field(() => Int)
  eventId: number;
  @Field(() => Int)
  userId: number;
}
