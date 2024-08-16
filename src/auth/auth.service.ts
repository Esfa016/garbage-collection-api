import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './Model/authSchema';
import { Model } from 'mongoose';
import {
  AuthDTO,
  ChangePasswordDTO,
  ResetPasswordDTO,
} from './Validation/authDTO';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/Global/messages';
import * as bcrypt from 'bcrypt';
import { generateOtp, verifyOtp } from 'otp-generator-ts';
import { EmailsService } from 'src/emails/emails.service';
import { OtpCodes } from './Model/otpSchema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly repository: Model<Admin>,
    @InjectModel(OtpCodes.name) private readonly optRepo: Model<OtpCodes>,
    private jwtService: JwtService,
    private emailService: EmailsService,
  ) {}

  async login(loginData: AuthDTO) {
    const adminAccount: Admin = await this.repository.findOne({
      email: loginData.email,
    });
    if (!adminAccount)
      throw new UnauthorizedException(ErrorMessages.IncorrectCredentials);
    const passMatch: boolean = await bcrypt.compare(
      loginData.password,
      adminAccount.password,
    );
    if (!passMatch)
      throw new UnauthorizedException(ErrorMessages.IncorrectCredentials);
    const accessToken: string = this.jwtService.sign({ id: adminAccount._id });
    return accessToken;
  }

  async changePassword(passwordData: ChangePasswordDTO) {
    const adminAccount: Admin = await this.getAdmin();
    const newPasswpord: string = await this.hashPassword(passwordData.password);
    adminAccount.password = newPasswpord;
    await adminAccount.save();
  }

  async requestResetPassword() {
    const admin: Admin = await this.getAdmin();

    const otp = generateOtp(6, '30m', process.env.OTP);
    await this.optRepo.create({ otp: otp.otp, token: otp.token });
    await this.emailService.sendPasswordResetOtp(otp.otp, admin.email);
  }

  async resetPassword(resetBody: ResetPasswordDTO) {
    const otpFound: OtpCodes = await this.optRepo.findOne({
      otp: resetBody.otp,
    });
    if (!otpFound) throw new NotFoundException(ErrorMessages.OtpNotFound);
    const isValid: boolean = verifyOtp(otpFound.otp, otpFound.token, process.env.OTP);
      if (!isValid) {
          
          await this.optRepo.findByIdAndDelete(otpFound._id)
          throw new ForbiddenException(ErrorMessages.OtpExpired);
      }
    const admin: Admin = await this.getAdmin();
    const newPassword: string = await this.hashPassword(resetBody.password);
    admin.password = newPassword;
    await admin.save();
  }

  getAdmin() {
    return this.repository.findOne();
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 9);
  }
}
