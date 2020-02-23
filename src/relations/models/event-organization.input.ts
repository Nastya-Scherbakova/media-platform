import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class EventOrganizationInput {
  @Field(() => Int)
  eventId: number;
  @Field(() => Int)
  organizationId: number;
}
