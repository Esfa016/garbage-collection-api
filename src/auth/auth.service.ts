import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './Model/authSchema';
import { Model } from 'mongoose';
import { AuthDTO } from './Validation/authDTO';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/Global/messages';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(@InjectModel(Admin.name) private readonly repository: Model<Admin>,private jwtService:JwtService) { }
    
    async login(loginData: AuthDTO) {
        const adminAccount: Admin = await this.repository.findOne({ email: loginData.email })
        if (!adminAccount) throw new UnauthorizedException(ErrorMessages.IncorrectCredentials)
        const passMatch: boolean = await bcrypt.compare(loginData.password, adminAccount.password)
        if (!passMatch)
            throw new UnauthorizedException(ErrorMessages.IncorrectCredentials)
        const accessToken: string = this.jwtService.sign({ id: adminAccount._id })
        return accessToken;
    
    }  
}
