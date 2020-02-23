import { Module } from '@nestjs/common';
import { EventsResolver } from './events.resolver';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [EventsResolver],
})
export class EventsModule {}
