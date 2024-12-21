import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { errorCodes } from 'src/constants/app.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    let err = exception['response'];
    err = err.response ? err.response : JSON.stringify(err);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    let errorCode = 'UNKNOWN_ERROR_CODE';
    let responseMessage = '';
    this.logger.error(
      `Error on API [${context.getRequest().method} :${
        context.getRequest().url
      }] || Error Message [${JSON.stringify(err)}]`,
    );
    const error =
      typeof exception.getResponse() === 'string'
        ? exception.getResponse()
        : exception.getResponse() &&
          typeof exception.getResponse()['message'] === 'object'
        ? exception.getResponse()['message'].join(', ')
        : exception.getResponse()['message'];

    if (status === HttpStatus.BAD_REQUEST) {
      responseMessage = 'Bad Request';
    }

    for (const [code, message] of Object.entries(errorCodes)) {
      if (error === message) {
        errorCode = code;
        break;
      }
    }
    
    if (err.includes('ER_DUP_ENTRY')) {
      response.status(status).json({
        isSuccess: false,
        statusCode: status,
        error: 'Duplicate Entry',
        data: {},
      });
    } else if (err.includes('ER_NO_REFERENCED_ROW')) {
      const arr = err.split(' ');
      response.status(status).json({
        isSuccess: false,
        statusCode: status,
        error: `Foreign Key Error. Incorrect ${arr[arr.length - 2]}`,
        data: {},
      });
    } else {
      response.status(status).json({
        isSuccess: false,
        statusCode: status,
        message: responseMessage,
        error: {
          errorCode: errorCode,
          errorMessage: error,
        },
      });
    }
  }
}
