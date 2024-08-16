import { Controller, Post, Body, Res, HttpStatus, UseGuards , Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDTO, ChangePasswordDTO, ResetPasswordDTO } from './Validation/authDTO';
import { SuccessMessages } from 'src/Global/messages';
import { AdminAuthGuard } from './Guards/authGuards';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async loginAdmin(@Res() response: Response, @Body() body: AuthDTO) {
    const result = await this.authService.login(body);

    return response
      .status(HttpStatus.OK)
      .json({
        success: true,
        message: SuccessMessages.LoginSuccessful,
        accessToken: result,
      });
  }
  @UseGuards(AdminAuthGuard)
  @Post('change-password')
  async changePassword(@Res() response: Response, @Body() body: ChangePasswordDTO) {
    
    await this.authService.changePassword(body)
    return response.status(HttpStatus.OK).json({success:true,message:SuccessMessages.UpdateSuccessful})
  }
  @Get('request-password-reset')
  async requestResetPassword(@Res()response:Response) {
    await this.authService.requestResetPassword()
    return response.status(HttpStatus.OK).json({success:true,message:SuccessMessages.ResetPasswordSent})
  }
  @Post('reset-password')
  async resetPassword(@Res() response: Response, @Body() body: ResetPasswordDTO) {
    await this.authService.resetPassword(body)
    return response.status(HttpStatus.OK).json({success:true,message:SuccessMessages.UpdateSuccessful})
  }
}
