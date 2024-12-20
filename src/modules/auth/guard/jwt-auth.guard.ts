import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JswAuthGuard extends AuthGuard('jwt') {}
