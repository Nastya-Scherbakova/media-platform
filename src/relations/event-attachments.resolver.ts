import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { EventAttachment } from '../models/db/relations/event-attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from '../models/db/attachment.entity';
import { Event } from '../models/db/event.entity';
import { EventAttachmentInput } from './models/event-attachment.input';

@Resolver(() => EventAttachment)
export class EventAttachmentsResolver {
  constructor(
    @InjectRepository(EventAttachment)
    private readonly eventAttachmentsRepository: Repository<EventAttachment>,
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  @Query(returns => EventAttachment, { name: 'eventAttachment' })
  async getEventAttachment(@Args('id') id: number) {
    return this.eventAttachmentsRepository.findOne(id);
  }

  @Mutation(returns => EventAttachment)
  async createEventAttachment(
    @Args('eventAttachmentInput') eventAttachmentInput: EventAttachmentInput,
  ) {
    let attachment = await this.attachmentsRepository.findOne(
      eventAttachmentInput.attachmentId,
    );
    const event = await this.eventsRepository.findOne(
      eventAttachmentInput.eventId,
    );
    return this.eventAttachmentsRepository.save({ attachment, event });
  }

  @ResolveProperty('attachment', () => Attachment)
  async getAttachment(@Parent() eventAttachment) {
    const { id } = eventAttachment;
    return (
      await this.eventAttachmentsRepository.findOne(id, {
        relations: ['attachment'],
      })
    ).attachment;
  }

  @ResolveProperty('event', () => Event)
  async getEvent(@Parent() eventAttachment) {
    const { id } = eventAttachment;
    return (
      await this.eventAttachmentsRepository.findOne(id, {
        relations: ['event'],
      })
    ).event;
  }
}
