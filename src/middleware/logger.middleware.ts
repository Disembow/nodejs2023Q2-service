import {
  Injectable,
  Logger,
  NestMiddleware,
  RawBodyRequest,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { existsSync } from 'fs';
import { appendFile, mkdir, stat } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logFileNumber: number;

  constructor() {
    this.logFileNumber = 1;
  }

  private logger = new Logger('HTTP');

  async use(req: RawBodyRequest<Request>, res: Response, next: NextFunction) {
    const { originalUrl, method, rawBody, rawHeaders } = req;
    const { statusCode } = res;

    res.on('finish', async () => {
      const message = `Request info. Method: ${method}, URL: ${originalUrl}, Headers: ${rawHeaders} Body: ${
        rawBody ? rawBody.toString() : ''
      } Response info. Status: ${statusCode}`;

      this.logger.log(message);

      const fileDir = resolve(process.cwd(), 'logs');
      if (!existsSync(fileDir)) {
        await mkdir(fileDir);
      }

      let pathToLogFile = resolve(
        fileDir,
        `http_log_${this.logFileNumber}.txt`,
      );

      if (!existsSync(pathToLogFile)) {
        await appendFile(pathToLogFile, '');
      }

      const stats = await stat(pathToLogFile);
      const sizeInKb = Number((stats.size / 1024).toFixed(2));

      if (sizeInKb > +process.env.LOGGER_FILE_MAX_SIZE) {
        this.logFileNumber += 1;

        pathToLogFile = resolve(fileDir, `http_log_${this.logFileNumber}.txt`);
      }

      await appendFile(pathToLogFile, `${message}\n`);
    });

    next();
  }
}
