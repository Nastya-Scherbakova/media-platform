import { Module } from '@nestjs/common';
import { OrganizationsResolver } from './organizations.resolver';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [OrganizationsResolver],
})
export class OrganizationsModule {}
