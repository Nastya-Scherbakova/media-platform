import { InputType, Field } from 'type-graphql';

@InputType()
export class OrganizationInput {
  @Field()
  name: string;
  @Field()
  mainImageLink: string;
}
