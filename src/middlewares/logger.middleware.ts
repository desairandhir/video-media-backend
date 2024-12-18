import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(
      `Request Method:[${req.method}] || Request URI:${
        req.baseUrl
      } || Request Body:[${JSON.stringify(
        req.body,
      )}] || Request Query Params:[${JSON.stringify(req.query)}] Request IP:[${
        req.ip
      }]`,
    );
    next();
  }
}
