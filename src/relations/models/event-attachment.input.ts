import { InputType, Field, Int } from "type-graphql";

@InputType()
export class EventAttachmentInput {
    @Field(() => Int)
    eventId: number;
    @Field({nullable: true})
    link?: string;
    @Field(() => Int, {nullable: true})
    attachmentId?: number;
}