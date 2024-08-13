import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItemLabel, ItemType } from '../Model/itemSchema';

export class CreateItemDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsInt()
  @IsNotEmpty()
  price: number;
  @IsEnum(ItemLabel)
  @IsNotEmpty()
  label: ItemLabel;
  @IsEnum(ItemType)
  @IsNotEmpty()
  type: ItemType;
  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateItemDTO {
  @IsString()
  @IsOptional()
  title: string;
  @IsInt()
  @IsOptional()
  price: number;
  @IsEnum(ItemLabel)
  @IsOptional()
  label: ItemLabel;
  @IsEnum(ItemType)
  @IsOptional()
  type: ItemType;
  @IsOptional()
  @IsString()
  description: string;
}
