import { Module } from '@nestjs/common';
import { DetectionController } from './detection.controller';
import { DetectionService } from './detection.service';
import { Detection } from './entities/detection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { WinstonLoggerService } from 'src/logger/logger.service';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Detection])],
  controllers: [DetectionController],
  providers: [
    DetectionService,
    EmailService,
    ConfigService,
    WinstonLoggerService,
  ],
  exports: [DetectionService],
})
export class DetectionModule {}
