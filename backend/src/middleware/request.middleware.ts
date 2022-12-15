/*

To log the user request and the response from our server
 
*/

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    this.logger.log(
      '*************************** Start Of Request ***************************',
    );
    // const token = <string>request.headers.authorization;
    // console.log('token => ', token);
    this.logger.log(`body of the request => ${request.body} `);
    this.logger.log(`original url ${request.originalUrl}`);
    this.logger.log(
      '*************************** End Of Request ***************************',
    );

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        '*************************** Start Of Response ***************************',
      );
      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      this.logger.log(
        '*************************** End Of Response ***************************',
      );
    });

    next();
  }
}
