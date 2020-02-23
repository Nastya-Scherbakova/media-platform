import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class OrganizationAttachmentInput {
  @Field(() => Int)
  organizationId: number;
  @Field(() => Int)
  attachmentId: number;
}
