import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    res.status(status).json({
      status: false,
      error: {
        message: exception.message || 'Unhandled error happened',
        statusCode: status,
      },
    });
  }
}
