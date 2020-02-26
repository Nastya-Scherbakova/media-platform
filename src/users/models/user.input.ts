import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  about: string;
  @Field()
  @Length(1, 255)
  @IsEmail()
  email: string;
  @Field()
  @Length(8, 255)
  password: string;
}
