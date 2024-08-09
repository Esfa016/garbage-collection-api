import { Controller, Post,Body,Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDTO } from './Validation/authDTO';
import { SuccessMessages } from 'src/Global/messages';

@Controller({version:'1',path:'auth'})
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('login')
  async loginAdmin(@Res() response: Response, @Body() body: AuthDTO) {
    const result = await this.authService.login(body)
    response.setHeader('Authorization', `Bearer ${result}`)
    return response.status(HttpStatus.OK).json({success:true,message:SuccessMessages.LoginSuccessful,accessToken:result})
  }
}
