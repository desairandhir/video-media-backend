import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './constants/env.constant';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DetectionModule } from './modules/detection/detection.module';
import { ServeStaticModule } from '@nestjs/serve-static';

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
      entities: [path.join(__dirname, '*/*.entity{.ts,.js}')],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UserModule,
    AuthModule,
    DetectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
