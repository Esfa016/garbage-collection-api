import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { TemplateIds } from './types';

@Injectable()
export class EmailsService {
  constructor(@InjectSendGrid() private mailer: SendGridService) {}

  sendPasswordResetOtp(otp: number, email: string) {
    const messageData: Object = {
      to: email,
      from: {
        name: 'Hillsteh',
        email: 'contact@hillstech.de',
      },
      templateId: TemplateIds.ResetPassword,
      dynamic_template_data: {
        otp: otp,
      },
    };
    return this.mailer.send(messageData);
  }
}
