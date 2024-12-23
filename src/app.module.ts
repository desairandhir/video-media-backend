import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './constants/env.constant';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: Env.MYSQL.HOST,
      port: Env.MYSQL.PORT,
      username: Env.MYSQL.USERNAME,
      password: Env.MYSQL.PASSWORD,
      database: Env.MYSQL.DATABASE,
      autoLoadEntities: Boolean(Env.MYSQL.AUTOLOADENTITIES),
      synchronize: Boolean(Env.MYSQL.SYNCHRONIZE),
      entities: [join(__dirname, '*/*.entity{.ts,.js}')],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
