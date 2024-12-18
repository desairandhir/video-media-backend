import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './logger.service';

@Module({
  controllers: [],
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService],
})
export class LoggerModule {}
