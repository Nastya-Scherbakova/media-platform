import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class OrganizationUserInput {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  organizationId: number;
}
