import {
  Injectable,
  Logger,
  NestMiddleware,
  RawBodyRequest,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: RawBodyRequest<Request>, res: Response, next: NextFunction) {
    const { originalUrl, method, rawBody, rawHeaders } = req;
    const { statusCode } = res;

    this.logger.log(
      `Request info. Method: ${method}, URL: ${originalUrl}, Headers: ${rawHeaders} Body: ${
        rawBody ? rawBody.toString() : ''
      } Response info. Status: ${statusCode}`,
    );

    next();
  }
}
