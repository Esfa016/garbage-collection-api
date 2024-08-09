import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './Model/authSchema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
console.log(process.env.JWT_USER)

@Module({
  imports: [
   ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]), JwtModule.register({ secret: process.env.JWT_USER, signOptions: { expiresIn: '1d' } })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
