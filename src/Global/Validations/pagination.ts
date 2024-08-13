
import { IsInt, IsOptional,  IsNumber, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class QueryParamsDTO {
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  @Min(1)
  limit: number = 10;
  @IsOptional()
  @IsString()
  searchKey:string
}
