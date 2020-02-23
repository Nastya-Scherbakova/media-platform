import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class UserRoleInput {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  roleId: number;
}
