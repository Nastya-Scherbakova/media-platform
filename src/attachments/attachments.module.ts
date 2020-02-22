import { Module } from '@nestjs/common';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { AttachmentsResolver } from './attachments.resolver';

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService, AttachmentsResolver]
})
export class AttachmentsModule {}
