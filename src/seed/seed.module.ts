import { Module, OnModuleInit } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [ConfigModule, SharedModule],
  providers: [SeedService],
})
export class SeedModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  onModuleInit() {
    this.seedService.seed();
  }
}
