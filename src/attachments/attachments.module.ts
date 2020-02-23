import { Module } from '@nestjs/common';
import { AttachmentsResolver } from './attachments.resolver';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [
    AttachmentsResolver
  ]
})
export class AttachmentsModule { }
