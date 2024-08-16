import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsInt } from "class-validator";

export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password:string
}

export class ChangePasswordDTO {
    @IsNotEmpty()
    @IsStrongPassword()
    password:string
}

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsInt()
  otp: number;
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}