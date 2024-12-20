import { Controller, Post, Request, Body } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  //   @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    console.log(req.user);
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
