import { Type } from 'class-transformer';
import {
  IsDate,
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsInt,
} from 'class-validator';
import mongoose from 'mongoose';
import { IsArrayOfObjectIds } from 'src/Global/Validations/pagination';

export class BookCollectionDTO {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  collectionDate: Date;
  @IsString()
  @IsNotEmpty()
  collectionSlot: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  addressLine1: string;
  @IsString()
  @IsOptional()
  addressLine2: string;
  @IsString()
  @IsNotEmpty()
  country: string;
  @IsPostalCode()
  @IsNotEmpty()
  postalCode: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  accessInformation: string;
  @IsInt()
  @IsNotEmpty()
  totalAmount: number;
  @IsNotEmpty()
  @IsArrayOfObjectIds()
  items: mongoose.Schema.Types.ObjectId[];
}
