import { Injectable,  NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class RawMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
     
        if (req.headers['content-type'] === 'application/octet-stream') {
            req.body = Buffer.from([]);
            req.on('data', (chunk) => {
              req.body = Buffer.concat([req.body, chunk]);
            });
            req.on('end', next);
          } else {
              next();
          }
    }
}



