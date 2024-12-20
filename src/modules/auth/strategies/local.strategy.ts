import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { errorCodesWithMsg } from 'src/constants/app.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        errorCodesWithMsg.DOCERPERROR019,
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
