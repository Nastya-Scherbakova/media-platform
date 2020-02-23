import { InputType, Field } from "type-graphql";

@InputType()
export class AttachmentInput {
    @Field()
    link: string;
}