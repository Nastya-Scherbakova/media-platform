import { InputType, Field } from 'type-graphql';

@InputType()
export class RoleInput {
  @Field()
  name: string;
}
