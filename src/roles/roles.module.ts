import { Module } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [RolesResolver],
})
export class RolesModule {}
