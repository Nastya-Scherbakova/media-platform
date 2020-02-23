import { InputType, Field, Int, GraphQLTimestamp } from 'type-graphql';
import { EventType } from '../../models/db/event.entity';

@InputType()
export class EventInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  additionalInfo: string;
  @Field(type => EventType)
  type: EventType;
  @Field({ nullable: true })
  cronStart: string;
  @Field({ nullable: true })
  cronEnd: string;
  @Field()
  dateStart: Date;
  @Field()
  dateEnd: Date;
  @Field(type => Int)
  completleness: number = 0;
}
