import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RedisService } from './utils/cache/redis/redisUtil';
// import entities from './dbModules/index';
import { PassportModule } from '@nestjs/passport';
// import { LoginModule } from './modules/login/login.module';
// import { PatientModule } from './modules/patient/patient.module';
// import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
// import { InvoiceModule } from './modules/invoice/invoice.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // UserModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [JwtService, AppService],
})
export class AppModule {}
