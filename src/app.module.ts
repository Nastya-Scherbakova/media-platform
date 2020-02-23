import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { EventsModule } from './events/events.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { RolesModule } from './roles/roles.module';
import { RelationsModule } from './relations/relations.module';
import { SharedModule } from './shared/shared.module';
import configuration from './config/app.config';
import { RolesGuard } from './shared/guards/roles.guard';

const AppConfigModule = ConfigModule.forRoot({
  load: [configuration],
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get('database.url'),
        type: configService.get('database.type'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UsersModule,
    OrganizationsModule,
    EventsModule,
    AttachmentsModule,
    RolesModule,
    RelationsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
