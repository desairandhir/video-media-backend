import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { errorCodes } from 'src/constants/app.constant';
import { WinstonLoggerService } from 'src/logger/logger.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: WinstonLoggerService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOneWithEmail(email);
      if (!user) {
        throw new HttpException(
          errorCodes.BACKENDERROR017,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      throw new HttpException(
        errorCodes.BACKENDERROR019,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR029}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async login(loginDto: LoginDto, req: any) {
    try {
      console.log(req);
      const { email, password } = loginDto;
      const user = await this.validateUser(email, password);
      if (!user) {
        throw new HttpException(
          errorCodes.BACKENDERROR017,
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = {
        email: user.email,
        role: user.role,
        sub: {
          name: user.username,
        },
      };
      const accessToken = this.jwtService.sign(payload);
      return {
        ...user,
        accessToken,
      };
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR030}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
