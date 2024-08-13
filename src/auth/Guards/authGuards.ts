import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { ErrorMessages } from "src/Global/messages";
class Exporter {
  static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
@Injectable()
export class AdminAuthGuard implements CanActivate{
    constructor (private jwtService:JwtService){}
async canActivate(context: ExecutionContext):Promise<boolean>{
     const request = context.switchToHttp().getRequest();
     const token = Exporter.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException(ErrorMessages.Unauthorized);
    try {
         await this.jwtService.verify(token,{secret:process.env.JWT_USER})

     }
    catch (error) {
        if (error.message === 'jwt expired') {
            throw new ForbiddenException(ErrorMessages.TokenExpired)
        }
    }
    return true
}
}
