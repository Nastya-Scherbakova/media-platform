import { InputType, Field } from 'type-graphql';
import { MaxLength, Length } from 'class-validator';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  about: string;
  @Field()
  @MaxLength(255)
  email: string;
  @Field()
  @Length(8, 255)
  password: string;
}
