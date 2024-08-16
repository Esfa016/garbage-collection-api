import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    SendGridModule.forRoot({ apiKey: process.env.SENDGRID_API_KEY })],
  providers: [EmailsService],
  exports:[EmailsService]
})
export class EmailsModule {}
