import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserInput } from './models/user.input';
import { ResGql } from '../shared/decorators/decorators';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/db/user.entity';
import { Repository } from 'typeorm';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Mutation(returns => User)
  async login(
    @Args('loginInput') loginInput: UserInput,
    @ResGql() res: Response,
  ) {
    const user = await this.usersRepository.findOne({
      where: { email: loginInput.email },
    });
    if (!user) {
      throw Error('Email or password incorrect');
    }

    const valid = user.comparePassword(loginInput.password);
    if (!valid) {
      throw Error('Email or password incorrect');
    }

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }

  @Mutation(returns => User)
  async signup(
    @Args('signUpInput') signUpInputDto: UserInput,
    @ResGql() res: Response,
  ) {
    const emailExists = await this.usersRepository.findOne({
      where: { email: signUpInputDto.email },
    });
    if (emailExists) {
      throw Error('Email is already in use');
    }

    const user = await this.usersRepository.create({ ...signUpInputDto });
    await this.usersRepository.save(user);
    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }
}
