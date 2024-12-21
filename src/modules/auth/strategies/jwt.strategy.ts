import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Env } from 'src/constants/env.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Env.JWT.AUTH_TOKEN,
    });
  }

  async validate(payload: any) {
    return {
      user: payload.sub,
      email: payload.username,
      role: payload.role,
    };
  }
}
