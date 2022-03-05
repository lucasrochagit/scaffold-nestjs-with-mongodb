import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const { ENV } = process.env;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const genericExceptionBody = {
      message: 'An internal error occurred while making the request.',
      description:
        'Please check the submitted data in request or try again later.',
      request: {
        method: request.method,
        path: request.url,
        params: request.params,
        body: request.body,
      },
      details: exception.toString(),
    };

    const genericException = new InternalServerErrorException(
      genericExceptionBody,
    );

    const [exceptionStatus, exceptionBody] =
      exception instanceof HttpException
        ? [exception.getStatus(), exception.getResponse()]
        : [genericException.getStatus(), genericException.getResponse()];

    if (ENV === 'prod') {
      delete exceptionBody['details'];
      delete exceptionBody['request'];
    }

    response.status(exceptionStatus).json(exceptionBody);
  }
}
