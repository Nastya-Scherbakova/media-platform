import { Attachment } from "../../models/db/attachment.entity";
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class AttachmentInput {
    @Field()
    link: string;
  }