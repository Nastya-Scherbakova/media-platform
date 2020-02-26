import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../models/db/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../models/db/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async validate({ id }): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          userRoles: 'user.userRoles',
          role: 'userRoles.role',
        },
      },
    });
    if (!user) {
      throw Error('Authenticate validation error');
    }
    return user;
  }
}
