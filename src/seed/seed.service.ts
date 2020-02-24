import { Injectable } from '@nestjs/common';
import { OrganizationUser } from '../models/db/relations/organization-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../models/db/relations/user-role.entity';
import { Repository } from 'typeorm';
import { User } from '../models/db/user.entity';
import { Role } from '../models/db/role.entity';
import { Organization } from '../models/db/organization.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserRole)
    private readonly userRolesRepository: Repository<UserRole>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {
    this.seed();
  }
  private async seed() {
    let adminRole = await this.rolesRepository.findOne({where: {name: 'admin'}});
    if(!adminRole) {
      adminRole = await this.rolesRepository.save({name: 'admin'});
    }

    let orgAdminRole = await this.rolesRepository.findOne({where: {name: 'orgAdmin'}});
    if(!orgAdminRole) {
      orgAdminRole = await this.rolesRepository.save({name: 'orgAdmin'});
    }

    let admin = await (await this.userRolesRepository.findOne({where: {roleId: adminRole.id}})).user;
    if(!admin) {
      const adminMail = this.configService.get('seed.email');
      const adminPass = this.configService.get('seed.password');
      admin = await this.usersRepository.findOne({where: {email: adminMail}});
      if(!admin) {
        admin = await this.usersRepository.save({
          email: adminMail,
          password: adminPass
        });
      }
      
      await this.userRolesRepository.save([
        {user: Promise.resolve(admin), role: Promise.resolve(adminRole)},
        {user: Promise.resolve(admin), role: Promise.resolve(orgAdminRole)}
      ]);
    }
  }
}
