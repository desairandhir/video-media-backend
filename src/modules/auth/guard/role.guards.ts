import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { errorCodesWithMsg } from 'src/constants/app.constant';

@Injectable()
export class RoleGuard implements CanActivate {
  private roles: string[];

  constructor(...roles: string[]) {
    this.roles = roles;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new HttpException(
        errorCodesWithMsg.DOCERPERROR021,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
