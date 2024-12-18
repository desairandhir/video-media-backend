import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private logger = new Logger();

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        const response = {
          isSuccess: statusCode >= 200 && statusCode < 300 ? true : false,
          statusCode: statusCode,
          error: data && data.message ? data.message : '',
          data: data,
        };
        this.logger.debug(`Response: [${JSON.stringify(response)}]`);

        return response;
      }),
    );
  }
}
