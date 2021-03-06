import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && (req.cookies || req.headers.cookie)) {
    token = req.cookies?.token || req.headers.cookie.replace('token=', '');
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('jwtSecret'),
    });
  }

  validate(payload) {
    return this.authService.validate(payload);
  }
}
