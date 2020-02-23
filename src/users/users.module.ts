import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [UsersResolver],
})
export class UsersModule {}
