import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../models/db/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async validate({ id }): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw Error('Authenticate validation error');
    }
    return user;
  }
}
