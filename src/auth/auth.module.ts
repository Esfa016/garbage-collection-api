import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './Model/authSchema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AdminAuthGuard } from './Guards/authGuards';
import { OtpCodes, OtpCodeSchema } from './Model/otpSchema';
import { EmailsModule } from 'src/emails/emails.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_USER, signOptions: { expiresIn: '1d' }
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }, { name: OtpCodes.name, schema: OtpCodeSchema }]), JwtModule.register({ secret: process.env.JWT_USER, signOptions: { expiresIn: '1d' } }),
    EmailsModule
  
  ],
  
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
