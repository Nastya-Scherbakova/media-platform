import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../models/db/relations/user-role.entity';
import { Repository } from 'typeorm';
import { User } from '../models/db/user.entity';
import { Role } from '../models/db/role.entity';
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
  ) {}
  async seed() {
    let adminRole = await this.rolesRepository.findOne({
      where: { name: 'admin' },
    });
    if (!adminRole) {
      adminRole = await this.rolesRepository.save({ name: 'admin' });
    }

    let orgAdminRole = await this.rolesRepository.findOne({
      where: { name: 'orgAdmin' },
    });
    if (!orgAdminRole) {
      orgAdminRole = await this.rolesRepository.save({ name: 'orgAdmin' });
    }

    let adminUserRole = await this.userRolesRepository.findOne({
      where: { roleId: adminRole.id },
      relations: ['user'],
    });
    let admin = adminUserRole?.user;
    if (!admin) {
      const adminMail = this.configService.get('seed.email');
      const adminPass = this.configService.get('seed.password');
      admin = await this.usersRepository.findOne({
        where: { email: adminMail },
      });
      if (!admin) {
        admin = await this.usersRepository.save({
          email: adminMail,
          password: adminPass,
        });
      }

      let created = await this.userRolesRepository.save([
        { user: admin, role: adminRole },
        { user: admin, role: orgAdminRole },
      ]);

      const c = {};
    }
  }
}
