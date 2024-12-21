import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { Env } from 'src/constants/env.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    PassportModule,
    LoggerModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: Env.JWT.AUTH_TOKEN,
      signOptions: { expiresIn: Env.JWT.EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
